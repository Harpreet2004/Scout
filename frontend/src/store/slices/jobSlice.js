import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const jobSlice = createSlice({
  name:"jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true; state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    requestForSingleJob(state, action) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.singleJob = state.singleJob;
      state.error = action.payload;
      state.loading = false;
    },
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    requestForDeleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    requestForMyJobs(state, action) {
      state.loading = true;
      state.myJobs = [];
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;
      state.error = action.payload;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },

    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.singleJob = {};
    },
  },
});


export const fetchJobs = (location,niche,searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.requestForAllJobs());
    let link = "https://scout-bbc2.onrender.com/api/v1/job/getall?";

    let queryParams = [];

    if(location){
      queryParams.push(`location=${encodeURIComponent(location.trim())}`);
    }

    if(niche){
      queryParams.push(`niche=${encodeURIComponent(niche.trim())}`);
    }

    if(searchKeyword){
      queryParams.push(`searchKeyword=${encodeURIComponent(searchKeyword.trim())}`);
    }

    link+= queryParams.join("&");
    const response = await axios.get(link, {withCredentials: true});

    dispatch(jobSlice.actions.successForAllJobs(response.data.data.getJob));
    dispatch(jobSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(jobSlice.actions.failureForAllJobs(error.response?.data?.message || "Failed to fetch jobs"));

  }
}

export const postNewJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {    
    const response = await axios.post("https://scout-bbc2.onrender.com/api/v1/job/post", data, {withCredentials: true, headers: {"Content-Type":"application/json"}});

    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response?.data?.message || "Failed to Post Job"));
  }
}

export const fetchSingleJob = (jobid) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `https://scout-bbc2.onrender.com/api/v1/job/get/${jobid}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.data));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response?.data?.message || "Error! while dispatching single job"));
  }
};

export const getMyJobs = () => async(dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `https://scout-bbc2.onrender.com/api/v1/job/myjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.data));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response?.data?.message || "Error! while dispatching single job"));
  }
}

export const deleteMyJob = (id) => async(dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `https://scout-bbc2.onrender.com/api/v1/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response?.data?.message || "Error! while dispatching single job"));
  }
}

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
