import axios from "../axiosConfig"

export const apiGetCurent = () =>
  new Promise(async (resolve, reject) => {
    const response = await axios({
      method: "get",
      url: `api/v1/user/get-current`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });

  export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    const response = await axios({
      method: "put",
      url: `api/v1/user/`,
      data: payload
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });