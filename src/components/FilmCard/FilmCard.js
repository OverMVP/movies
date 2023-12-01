import { Component } from "react";
import "./FilmCard.css";
import { Rate } from "antd";
import format from "date-fns/format";
import { nanoid } from "nanoid";
import FilmsAPI from "../FilmsAPI";

function filterGenres(list, ids) {
  return list.reduce((acc, el) => {
    if (ids.includes(el.id)) acc = [...acc, el];
    return acc;
  }, []);
}

function validateDescription(refference, size) {
  if (refference.length > size) {
    return `${refference.slice(0, size - 3)}...`;
  }
  return refference;
}

function formatWithDateFns(dateString) {
  // The Prop format is "2023-06-24" ("yyyy-mm-dd"). I split it on "-". Then I fix the array of values to make
  // it the right format for date-fns function called format() which only takes numbers(see: https://date-fns.org/v2.16.1/docs/format),
  // that's why we convert every element of arr to a number. Btw Number(05) -> 5
  const datesArr = dateString.split("-");
  const fixedDatesArr = datesArr.map((el) => Number(el));
  return format(new Date(...fixedDatesArr), "d MMM yyyy");
}

function getRatingColor(value) {
  let color;

  const colors = ["#E90000", "#E97E00", "#E9D100", "#66E900"];

  if (value >= 0 && value < 3) {
    color = colors[0];
  }

  if (value >= 3 && value < 5) {
    color = colors[1];
  }

  if (value >= 5 && value < 7) {
    color = colors[2];
  }

  if (value >= 7) {
    color = colors[3];
  }

  return {
    borderColor: color,
  };
}

export default class FilmCard extends Component {
  api = new FilmsAPI();
  state = {
    starsValue: null,
  };

  onValueChanged = (value) => {
    this.setState({
      starsValue: value,
    });
    sessionStorage.setItem(this.props.movieID, value);
  };

  componentDidUpdate(_, prevState) {
    if (prevState.starsValue !== this.state.starsValue) {
      this.api.addRating(
        this.state.starsValue,
        this.props.guestSessionID,
        this.props.movieID
      );
    }
  }

  #imgURL = `https://image.tmdb.org/t/p/original${this.props.imgsource}`;
  popularity = this.props.rating.toFixed(1);

  render() {
    const { title, overview, genresList, itemGenres, releaseDate } = this.props;
    const filmGenres = filterGenres(genresList, itemGenres).map((el) => {
      return (
        <a key={nanoid()} href="/#" className="genre">
          {el.name}
        </a>
      );
    });

    const shortDescription = validateDescription(overview, 110);
    const shortenedTitle = validateDescription(title, 30);
    const date = formatWithDateFns(releaseDate);
    const rate = sessionStorage.getItem(this.props.movieID);

    return (
      <li className="filmcard">
        <img
          className="filmcard-image"
          src={this.#imgURL}
          loading="lazy"
          alt=""
        />
        <div className="description">
          <div className="rating" style={getRatingColor(this.popularity)}>
            <span>{this.popularity}</span>
          </div>
          <h1 className="filmcard-title">{shortenedTitle}</h1>
          <div className="release-data">{date}</div>
          <div className="genres">{filmGenres}</div>
          <p className="short-description">{shortDescription}</p>
          <Rate
            onChange={this.onValueChanged}
            className="star-rating"
            defaultValue={rate ? rate : 0}
            count={10}
            style={{ fontSize: 16 }}
          />
        </div>
      </li>
    );
  }
}
