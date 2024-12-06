import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice.js";
import userReducer from "./slices/userSlice.js";
import applicationReducer from "./slices/applicationSlice.js";
import updateProfileReducer from "./slices/updateProfile.js";

const store = configureStore({
  reducer: {
      user: userReducer,
      jobs: jobReducer,
      application: applicationReducer,
      updateProfile: updateProfileReducer
  },
});

export default store;