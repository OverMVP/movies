import { Component } from 'react';
import './FIlmList.css';
import FilmCard from '../FilmCard';
import Spinner from '../Spinner';
import ErrorPage from '../ErrorPage';
import Pagination from '../Pagination';

export default class FilmList extends Component {
  render() {
    const { list, error, isLoading, page, totalResults, onPageChanged, guestSessionID, genresList } = this.props;

    const filmsList = list.map((el) => (
      <FilmCard
        genresList={genresList}
        guestSessionID={guestSessionID}
        releaseDate={el.release_date}
        vote={el.vote_average}
        overview={el.overview}
        rating={el.vote_average}
        imgsource={el.poster_path}
        title={el.title}
        key={el.id}
        itemGenres={el.genre_ids}
        movieID={el.id}
      />
    ));

    return (
      <div className="filmlist-wrapper">
        <ul className="filmlist">
          {error ? <ErrorPage /> : null}
          {isLoading ? <Spinner /> : filmsList}
          {error ? null : <Pagination page={page} totalResults={totalResults} onPageChanged={onPageChanged} />}
        </ul>
      </div>
    );
  }
}
