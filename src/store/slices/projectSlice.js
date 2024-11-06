import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllProjectRequests(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewProjectRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addNewProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addNewProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    deleteProjectRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    updateProjectRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetProjectSlice(state) {
      state.error = null;
      //   state.softwareApplication = state.softwareApplication;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      //   state.softwareApplication = state.softwareApplication;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequests());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/project/getAll",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectSuccess(response.data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectFailed(error.response.data.message)
    );
  }
};
export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequests());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/project/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequests());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequests());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
