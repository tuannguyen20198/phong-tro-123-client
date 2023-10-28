import {
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsLimitAdmin
} from "../../services/post";
import actionTypes from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      post: null,
    });
  }
};
export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    console.log(response)
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      post: null,
    });
  }
};
export const getNewPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetNewPosts(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POST,
      newPosts: null,
    });
  }
};
export const getOutstandingPost = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order:['star','DESC']
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        outStandigPost: response.data.response.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_OUTSTANDING,
        msg: response.data.msg,
        outStandigPost: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OUTSTANDING,
      outStandigPost: null,
    });
  }
};
export const getPostsLimitAdmin = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimitAdmin(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_ADMIN,
        msg: response.data.msg,
        posts:null
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_ADMIN,
      post: null,
    });
  }
};

export const editData = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit 
})

export const resetDataEdit = (dataEdit) => ({
  type: actionTypes.RESET_DATAEDIT,
  dataEdit 
})