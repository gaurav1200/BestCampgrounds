import { configureStore, createSlice } from "@reduxjs/toolkit";

const massageInitalState = {
  massage: "",
  isSuccses: false,
  isError: false,
  loading: false,
};
const massageSlice = createSlice({
  name: "massage",
  initialState: massageInitalState,
  reducers: {
    setMassage: (state, action) => {
      state.massage = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsSuccses: (state, action) => {
      state.isSuccses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const initialState = { campgrounds: [], loading: true };
const allCampgroundsSlice = createSlice({
  name: "allCampgrounds",
  initialState,
  reducers: {
    addAllCampground: (state, action) => {
      state.campgrounds = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
const campIdInitialState = { campgroundId: "" };
const campIdSlice = createSlice({
  name: "campgroundId",
  initialState: campIdInitialState,
  reducers: {
    setCampgroundId: (state, action) => {
      state.campgroundId = action.payload;
    },
  },
});

const searchInitialState = { city: " ", state: " ", country: " " };
const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});
const initialStateCamp = { campground: {}, author: "", loading: true };
const campSlice = createSlice({
  name: "camp",
  initialState: initialStateCamp,
  reducers: {
    setCamp: (state, action) => {
      state.campground = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});
const initialStateCampground = {
  title: "",
  city: "",
  state: "",
  country: "",
  price: 0,
  description: "",
};
const campgroundSlice = createSlice({
  name: "campground",
  initialState: initialStateCampground,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

const loginUserInitialState = { user: {}, loading: true };
const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: loginUserInitialState,
  reducers: {
    setLogginUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const userinitialState = { user: {}, loading: true };
const userSlice = createSlice({
  name: "user",
  initialState: userinitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// const store = createStore(allCampgroundsSlice.reducer);
const store = configureStore({
  reducer: {
    campgrounds: allCampgroundsSlice.reducer,
    campgroundId: campIdSlice.reducer,
    search: searchSlice.reducer,
    camp: campSlice.reducer,
    user: userSlice.reducer,
    loginUser: loginUserSlice.reducer,
    massage: massageSlice.reducer,
    campground: campgroundSlice.reducer,
  },
});

export const allCampgrounds = allCampgroundsSlice.actions;
export const campgroundId = campIdSlice.actions;
export const search = searchSlice.actions;
export const camp = campSlice.actions;
export const user = userSlice.actions;
export const loginUser = loginUserSlice.actions;
export const massage = massageSlice.actions;
export const campground = campgroundSlice.actions;

export default store;
