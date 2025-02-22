import useAdminApis from '@hooks/apis/useAdminApis.mjs';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from 'react-query';

export const useGetUserList = () => {
  const { getUserList } = useAdminApis();

  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => getUserList(),
    select: (response) => response.data,
    suspense: true,
  });
};

export const usePatchUserRankUp = () => {
  const { patchUserRankUp } = useAdminApis();
  const queryClient = useQueryClient();
  return useMutation(patchUserRankUp, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin', 'users']);
    },
  });
};
