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

    if (searchQuery) {
        apiUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
    }
    const response = await fetch(apiUrl);
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
                    state.favouriteMovies = updatedFavorites;
                    localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavorites));
                }
            }

        },
        removeFavoriteMovie: (state, action) => {
            console.log("Remove From Favourite...");
            const movieId = action.payload;
            state.favouriteMovies = state.favouriteMovies.filter((movie) => movie.id !== movieId);

            localStorage.setItem('favouriteMovies', JSON.stringify(state.favouriteMovies));
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
        }
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
    },

});

export const { setHeader, setPage, setActiveGenre, setGenres, setBackGenre, addFavoriteMovie, removeFavoriteMovie, setLoader, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;