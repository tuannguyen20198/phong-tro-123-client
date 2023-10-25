import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    const response = await axiosConfig({
      method: "get",
      url: `api/v1/price/all`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    const response = await axiosConfig({
      method: "get",
      url: `api/v1/area/all`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });
export const apiGetProvnces = () =>
  new Promise(async (resolve, reject) => {
    const response = await axiosConfig({
      method: "get",
      url: `api/v1/province/all`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    const response = await axiosDefault({
      method: "get",
      url: 'https://vapi.vnappmob.com/api/province/',
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    const response = await axiosDefault({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });