import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadMovies = () => {
    const storedFavMovies = localStorage.getItem('favouriteMovies');
    return storedFavMovies ? JSON.parse(storedFavMovies) : [];
};

const initialState = {
    header: "Trending",
    totalPage: null,
    movies: [],
    searchedMovies: [],
    trending: [],
    upcoming: [],
    page: 1,
    activegenre: 28,
    genres: [],
    loader: true,
    backgenre: false,
    searchQuery: "",
    favouriteMovies: loadMovies()
};


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ activegenre, page, searchQuery }) => {
    let apiUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=IN&page=${page}`;

    if (activegenre) {
        apiUrl += `&with_genres=${activegenre}`;
    }
    console.log(activegenre)
    console.log(apiUrl);
    if (searchQuery) {
        apiUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
});

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&with_origin_country=IN&language=en-US`
    );
    const data = await response.json();
    return data.genres;
});

export const fetchTrendingMovies = createAsyncThunk('trending/fetchTrendingMovies', async (page) => {
    const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
    );
    const data = await response.json();
    return data;
});

export const fetchUpcomingMovies = createAsyncThunk('upcoming/fetchUpcomingMovies', async (page) => {
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
    );
    const data = await response.json();
    console.log(data);
    return data;
});

export const fetchSearchMovies = createAsyncThunk('search/fetchSearchMovies', async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFavoriteMovie: (state, action) => {
            const movieId = action.payload;
            console.log("Added To Favourite...",movieId)
            if (!state.favouriteMovies.includes(movieId)) {
                const movie = state.movies.find((m) => m.id === movieId);
                if (movie) {
                    const updatedFavorites = state.favouriteMovies.concat(movie);
                    console.log(updatedFavorites)
                    state.favouriteMovies = updatedFavorites;
                    localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavorites));
                } else {
                    const trendingMovie = state.trending.find((m) => m.id === movieId);
                    console.log("MOVIE  :", trendingMovie)
                    if (trendingMovie) {
                        const updatedFavorites = state.favouriteMovies.concat(trendingMovie);
                        console.log(updatedFavorites)
                        state.favouriteMovies = updatedFavorites;
                        localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavorites));
                    } else {
                        const upcomingMovie = state.upcoming.find((m) => m.id === movieId)
                        if (upcomingMovie) {
                            const updatedFavorites = state.favouriteMovies.concat(upcomingMovie);
                            console.log(updatedFavorites)
                            state.favouriteMovies = updatedFavorites;
                            localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavorites));
                        }
                    }
                }
            }
        },
        removeFavoriteMovie: (state, action) => {
            console.log("Remove From Favourite...");
            const movieId = action.payload;
            state.favouriteMovies = state.favouriteMovies.filter((movie) => movie.id !== movieId);
            localStorage.setItem('favouriteMovies', JSON.stringify(state.favouriteMovies));
        },
        setTrendingPage: (state, action) => {
            state.page = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setActiveGenre: (state, action) => {
            state.activegenre = action.payload;
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearSearchedMovies: (state) => {
            state.searchedMovies = [];
            state.searchQuery = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = state.movies.concat(action.payload.results); 
                state.totalPage = action.payload.total_pages;
                state.loader = false;
            })
            .addCase(fetchMovies.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.loader = false;
            });
        builder
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(fetchGenres.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchGenres.rejected, (state) => {
                state.loader = false;
            });
        builder
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                console.log(action.payload.results)
                state.trending = state.trending.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loader = false;
            })
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchTrendingMovies.rejected, (state) => {
                state.loader = false;
            });
        builder
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                console.log(action.payload.results)
                state.upcoming = state.upcoming.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loader = false;
            })
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchUpcomingMovies.rejected, (state) => {
                state.loader = false;
            });
        builder
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.searchedMovies = action.payload.results;
                state.totalPage = action.payload.total_pages;
                state.loader = false;
            })
            .addCase(fetchSearchMovies.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchSearchMovies.rejected, (state) => {
                state.loader = false;
            });
    },

});

export const { setHeader, setPage, setActiveGenre, setTrendingPage, setTrendingLoader, setGenres, setBackGenre, addFavoriteMovie, removeFavoriteMovie, setLoader, setSearchQuery, clearSearchedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;