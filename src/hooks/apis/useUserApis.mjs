import useCustomAxios from '@hooks/useCustomAxios.mjs';

const useUserApis = () => {
  const axios = useCustomAxios();

  const postSignUp = (formData) => {
    return axios.post('/users', formData);
  };

  const getEmailVerify = (email) => {
    return axios.get('/users/email', {
      params: {
        email: email,
      },
    });
  };

  const postLogin = (formData) => {
    return axios.post('/users/login', formData);
  };

  // 마이페이지
  const getMyInfo = (_id) => {
    return axios.get(`/users/${_id}`);
  };

  const getMyRecipeList = (_id) => {
    return axios.get(`/posts/users/${_id}?type=recipe`);
  };

  const getMyClassList = () => {
    return axios.get(`/seller/products`);
  };

  const getMyClassBookmarkList = () => {
    return axios.get(`bookmarks/product`);
  };

  const getMyRecipeBookmarkList = () => {
    return axios.get(`bookmarks/post`);
  };

  const getMyJoinList = () => {
    return axios.get(`orders`);
  };

  const patchMyInfo = (_id, formData) => {
    return axios.patch(`/users/${_id}`, formData);
  };

  const patchRequestRankUp = (_id) => {
    return axios.patch(`users/${_id}`, {
      extra: {
        confirm: false,
      },
    });
  };

  return {
    postSignUp,
    getEmailVerify,
    postLogin,
    getMyInfo,
    getMyRecipeList,
    getMyClassList,
    getMyClassBookmarkList,
    getMyRecipeBookmarkList,
    getMyJoinList,
    patchMyInfo,
    patchRequestRankUp,
  };
};

export default useUserApis;
