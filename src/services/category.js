import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    const response = await axiosConfig({
      method: "get",
      url: `api/v1/category/all`,
    });
    resolve(response);
    try {
    } catch (error) {
      reject(error);
    }
  });
