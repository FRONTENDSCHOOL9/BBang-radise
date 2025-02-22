import useMemberStore from '@zustand/memberStore.mjs';

export const useAuthenticate = () => {
  const user = useMemberStore((state) => state.user);
  const isUserLoggedIn = !!user;

  return { isUserLoggedIn, user };
};

export const useAuthorize = (requiredRole) => {
  const { isUserLoggedIn, user } = useAuthenticate();

  if (!isUserLoggedIn || !user) {
    return false;
  }

  if (requiredRole && user.type !== requiredRole) {
    return false;
  }

  return true;
};
