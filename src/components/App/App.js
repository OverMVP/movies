import { Component } from 'react';
import { debounce } from 'lodash';

import './App.css';
import Header from '../Header';
import SearchBar from '../SearchBar';
import FilmList from '../FilmsList';
import FilmsAPI from '../FilmsAPI';

function cutFilmList(arr, Number) {
  if (arr.length > Number) {
    return arr.slice(0, Number);
  }
  return arr;
}

function CutPages(items, Number) {
  let pages = items;
  if (items > Number) {
    pages = Number;
    return pages;
  }
  return pages;
}

export default class App extends Component {
  api = new FilmsAPI();

  cookieName = 'MovieDBSession';

  state = {
    activeKey: true,
    value: '',
    list: [],
    genresList: [],
    ratedList: [],
    isLoading: false,
    error: false,
    page: 1,
    totalResults: null,
    guestSessionID: null,
    ratedPage: 1,
  };

  componentDidMount() {
    this.getList(this.state.value);
    this.getGenres();
    this.getGuestSessionId();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page) {
      this.getList(this.state.value);
    }
    if (this.state.value !== prevState.value) {
      this.getList(this.state.value);
    }

    if (this.state.activeKey !== prevState.activeKey) {
      if (this.state.activeKey === false) this.getRatedList();
      if (this.state.activeKey === true) this.getList();
    }
  }

  onError() {
    this.setState(() => {
      return {
        error: true,
        isLoading: false,
        list: [],
      };
    });
  }

  getRatedList = () => {
    this.setState(({ isLoading }) => {
      return {
        isLoading: !isLoading,
        error: false,
      };
    });

    this.api
      .getRatedMovies(this.state.guestSessionID, 1)
      .then((body) => {
        if (body.total_results > 0) {
          return this.setState(({ isLoading }) => {
            return {
              list: cutFilmList(body.results, 500),
              isLoading: !isLoading,
              totalResults: CutPages(body.total_results, 10000),
              ratedPage: body.page,
              error: false,
            };
          });
        }
        throw Error();
      })
      .catch((err) => this.onError(err));
  };

  getGenres() {
    this.api.getGenresArr().then((body) =>
      this.setState({
        genresList: body.genres,
      })
    );
  }

  getGuestSessionId() {
    if (localStorage.getItem(this.cookieName) === null) {
      this.api.createGuestSession().then((body) => {
        this.setState({
          guestSessionID: body.guest_session_id,
        });
        localStorage.setItem(this.cookieName, body.guest_session_id);
      });
    } else {
      const sessionId = localStorage.getItem(this.cookieName);
      this.setState({
        guestSessionID: sessionId,
      });
    }
  }

  isSearchActive = (key) => {
    if (key === 'Search') {
      this.setState({
        activeKey: true,
      });
    }
    if (key === 'Rated') {
      this.setState({
        activeKey: false,
      });
    }
  };

  onPageChanged = (page) => {
    this.setState({
      page,
    });
  };

  getList = (value) => {
    this.setState(({ isLoading }) => {
      return {
        isLoading: !isLoading,
        error: false,
      };
    });

    this.api
      .getFilmsBySearch(value, this.state.page)
      .then((body) => {
        if (body.total_results > 0) {
          return this.setState(({ isLoading }) => {
            return {
              list: cutFilmList(body.results, 500),
              isLoading: !isLoading,
              totalResults: CutPages(body.total_results, 10000),
              page: body.page,
              error: false,
            };
          });
        }
        throw Error();
      })
      .catch((err) => this.onError(err));
  };

  onValueChange = (value) => {
    this.setState({
      value,
      page: 1,
    });
  };

  render() {
    const { list, error, isLoading, page, ratedPage, totalResults, genresList, value, guestSessionID, activeKey } =
      this.state;
    return (
      <>
        <Header
          isSearchActive={this.isSearchActive}
          getRatedList={this.getRatedList}
          value={value}
          getList={this.getList}
        />
        {activeKey ? <SearchBar onValueChange={debounce(this.onValueChange, 600)} /> : null}

        <FilmList
          genresList={genresList}
          guestSessionID={guestSessionID}
          list={list}
          error={error}
          isLoading={isLoading}
          page={activeKey ? page : ratedPage}
          totalResults={totalResults}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}
