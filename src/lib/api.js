import axios from 'axios';

const API_KEY = 'd101d3c09aadebd6fb2d039f413cc1ac';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (type, page = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`);
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchReviews = async (id, type) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}/reviews?api_key=${API_KEY}`);
  return response.data.results;
}

export const fetchTv = async (type, page = 1) => {
  const response = await axios.get(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`);
  return response.data;
};

export const fetchTvDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
  return response.data;
};

export const similarMovies = async (type, id) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`);
  return response.data.results;
}

export const fetchVideos = async (type, id) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`);
  return response.data.results;
}

export const fetchFavs = async (email) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getFavourite`, {
    params: { userEmail: email }
  });
  return response.data.favLists;
}