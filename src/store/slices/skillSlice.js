import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillRequests(state) {
      state.skills = [];
      state.error = null;
      state.loading = true;
    },
    getAllSkillSuccess(state, action) {
      state.skills = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSkillFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewSkillRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addNewSkillSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addNewSkillFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    deleteSkillRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteSkillSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteSkillFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    updateSkillRequests(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    updateSkillSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateSkillFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetSkillSlice(state) {
      state.error = null;
      //   state.skill = state.skill;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      //   state.skill = state.skill;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequests());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/skill/getAll",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};
export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequests());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/skill/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequests());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};
export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequests());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/skill/update/${id}`,
      { proficiency },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
