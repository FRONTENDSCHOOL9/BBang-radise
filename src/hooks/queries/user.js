import useUserApis from '@hooks/apis/useUserApis.mjs';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = (_id) => {
  const { getUserInfo } = useUserApis();

  return useQuery({
    queryKey: ['users', _id],
    queryFn: () => getUserInfo(_id),
    select: (response) => response.data,
    suspense: true,
  });
};

export const useGetUserClass = () => {
  const { getMyClassList } = useUserApis();

  return useQuery({
    queryKey: ['seller'],
    queryFn: () => getMyClassList(),
    select: (response) => response.data,
    suspense: true,
  });
};
