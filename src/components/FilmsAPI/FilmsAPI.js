export default class FilmsAPI {
  #authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWI1Y2ZlNDQ5N2I4ZDAzMjExM2EzMTBkNWM4YmY0NyIsInN1YiI6IjY1NjQ1YjE1ZDk1NTRiMDBlMzFmOWI4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MemMacEcv6iQypWOhduHhFQonCdInv4fFGXJ9RWrnDQ';

  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.#authToken,
    },
  };

  async getFilmsBySearch(searchValue = '', page = 1) {
    let URL;
    if (searchValue === '') {
      URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    } else
      URL = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=true&language=en-US&page=${page}`;
    const getResource = await fetch(URL, this.#options);
    return await getResource.json();
  }

  async getGenresArr() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const getResource = await fetch(URL, this.#options);
    return await getResource.json();
  }

  async addRating(starsValue, guestSessionId, movieId) {
    const token = '85b5cfe4497b8d032113a310d5c8bf47';

    console.log(starsValue);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: starsValue }),
    };
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${token}&guest_session_id=${guestSessionId}`;
    const postResource = await fetch(URL, options);
    return await postResource.json();
  }

  async createGuestSession() {
    const URL = `https://api.themoviedb.org/3/authentication/guest_session/new`;
    const getResource = await fetch(URL, this.#options);
    return await getResource.json();
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const token = '85b5cfe4497b8d032113a310d5c8bf47';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    };
    const URL = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${token}&&page=${page}`;
    const getList = await fetch(URL, options);
    return await getList.json();
  }
}
