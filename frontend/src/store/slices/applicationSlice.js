import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    error: null,
    applications: [],
    message: null,
  },
  reducers: {
    requestForEmployerApplication(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForEmployerApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload.data;
    },
    failureForEmployerApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplication(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload.data;
    },
    failureForMyApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    requestForDeleteApplication(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications;
    },
    resetAllApplications(state, action) {
      state.error = null;
      state.loading = false;
      state.applications = state.applications;
      state.message = null;
    },
  },
});

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplication());

  try {
    const response = await axios.get(
      "https://scout-bbc2.onrender.com/api/v1/application/jobseeker/getall",
      { withCredentials: true }
    );
    // console.log(response.data.data)
    dispatch(applicationSlice.actions.successForMyApplication(response.data));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplication(
        error.response?.data?.message || "Error in fetching job seeker applications"
      )
    );
  }
};

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForEmployerApplication());

  try {
    const response = await axios.get(
      "https://scout-bbc2.onrender.com/api/v1/application/employer/getall",
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForEmployerApplication(response.data)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForEmployerApplication(
        error.response?.data?.message || "Error in fetching employer applications"
      )
    );
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());

  try {
    const response = await axios.post(
      `https://scout-bbc2.onrender.com/api/v1/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: {"Content-Type" : "multipart/form-data"},
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    console.log(response.data)
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response?.data?.message || "Error while posting an application"
      )
    );
  }
};

export const deleteApplication = (deleteId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `https://scout-bbc2.onrender.com/api/v1/application/delete/${deleteId}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response?.data?.message || "Failed to delete application"
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetAllApplications());
};

export default applicationSlice.reducer;
