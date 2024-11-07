import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationRequests(state) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    getAllSoftwareApplicationSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSoftwareApplicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewSoftwareRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addNewSoftwareSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addNewSoftwareFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    deleteApplicationRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteApplicationSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteApplicationFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetApplicationsSlice(state) {
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

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationRequests()
  );
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/softwareApplication/getAll",
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(
        response.data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};
export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewSoftwareRequests());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/softwareApplication/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteApplicationRequests());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/softwareApplication/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.deleteApplicationSuccess(data.message)
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetApplicationsSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetApplicationsSlice());
};

export default softwareApplicationSlice.reducer;
