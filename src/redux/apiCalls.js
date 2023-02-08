import localStorageService from '../services/localStorageService';
import { notification } from 'antd';
import {
  loginFailure, loginStart, loginSuccess,
  updateUserStart, updateUserSuccess, updateUserFailure,
} from "./userRedux";
import {
  getAdressStart, getAdressSuccess, getAdressFailure,
  postAdressStart, postAdressSuccess, postAdressFailure,
  deleteAdressStart, deleteAdressSuccess, deleteAdressFailure,
  updateAdressStart, updateAdressSuccess, updateAdressFailure,
} from "./adressRedux";

import { getProductStart, getProductSuccess, getProductFailure } from "./productRedux"
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    //user คือ body 
    const res = await publicRequest.post("/auth/login", user);
    localStorageService.setToken(res.data.accessToken)
    if (res.data) {
      notification.success({
        message: `ยินดีต้อนรับคุณ ${res.data.firstName} ${res.data.lastName}`
      });
    };
    await dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(loginFailure());
  }
};

export const getAdress = async (dispatch, userId) => {
  dispatch(getAdressStart());
  try {
    const res = await userRequest.get(`/address/${userId}`);
    dispatch(getAdressSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(getAdressFailure());
  }
};

export const addAdress = async (dispatch, adress) => {
  dispatch(postAdressStart());
  try {
    const res = await userRequest.post(`/address`, adress);
    dispatch(postAdressSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(postAdressFailure());
  }
};

export const deleteAdress = async (dispatch, id) => {
  dispatch(deleteAdressStart());
  try {
    await userRequest.delete(`/address/${id}`)
    dispatch(deleteAdressSuccess(id));
  } catch (err) {
    console.log(err)
    dispatch(deleteAdressFailure());
  }
};

export const updateAdress = async (dispatch, adress, id) => {
  dispatch(updateAdressStart());
  try {
    const res = await userRequest.put(`/address/${id}`, adress);
    dispatch(updateAdressSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(updateAdressFailure());
  }
};

export const updateUser = async (dispatch, userBody, id) => {
  dispatch(updateUserStart());
  try {
    // console.log(id)
    const res = await userRequest.put(`/users/${id}`, userBody)
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.log(err)
    dispatch(updateUserFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

