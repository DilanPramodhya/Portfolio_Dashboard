import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequests(state) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimelineRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addTimelineRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetTimelineSlice(state) {
      state.error = null;
      //   state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      //   state.timeline = state.timeline;
    },
  },
});

export const getAllTimelines = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequests());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/timeline/getAll",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequests());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const addNewTimeline = (timeLineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequests());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/timeline/add",
      timeLineData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(error.response.data.message)
    );
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export default timelineSlice.reducer;
