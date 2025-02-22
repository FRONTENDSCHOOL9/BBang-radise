import useCustomAxios from '@hooks/useCustomAxios.mjs';

const useAdminApis = () => {
  const axios = useCustomAxios();

  const getUserList = () => {
    return axios.get(`admin/users`);
  };

  const patchUserRankUp = (_id) => {
    return axios.patch(`users/${_id}`, {
      type: 'seller',
      extra: {
        confirm: true,
      },
    });
  };

  return { getUserList, patchUserRankUp };
};

export default useAdminApis;
