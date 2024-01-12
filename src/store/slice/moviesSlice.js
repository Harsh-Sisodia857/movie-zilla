import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    searchQuery : ""
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ activegenre, page }) => {
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
        setHeader: (state, action) => {
            state.header = action.payload;
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
        setBackGenre: (state, action) => {
            state.backgenre = action.payload;
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
                state.movies = action.payload.results; 
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

export const { setHeader, setPage, setActiveGenre, setGenres, setBackGenre, setLoader, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;