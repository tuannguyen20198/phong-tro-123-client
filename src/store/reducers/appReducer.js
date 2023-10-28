import actionTypes from "../action/actionTypes";
const initState = {
  msg: "",
  categories: [],
  prices: [],
  areas:[],
  provinces: [],
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PRICES:
      console.log({
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      })
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_AREAS:
      return {
        ...state,
        areas: action.areas || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};
export default appReducer;
