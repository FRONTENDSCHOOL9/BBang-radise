import Section from '@components/ui/Section';
import Text from '@components/ui/Text';
import MemberCard from '@components/ui/card/MemberCard';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import SimpleButton from '@pages/mypage/SimpleButton';
import * as S from '@styles/admin/memberList.style';
import { useInfiniteQuery } from '@tanstack/react-query';
import useMemberStore from '@zustand/memberStore.mjs';
import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { Loader } from '@components/ui/Loading';

function MemberList() {
  const axios = useCustomAxios();
  const setUserData = useMemberStore((state) => state.setUser);
  const clearUserDataStorage = useMemberStore.persist.clearStorage;

  const ref = useRef(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const [isUpgradeUserList, setIsUpgradeUserList] = useState(false);

  const fetchStores = async ({ pageParam = 1 }) => {
    const custom = isUpgradeUserList ? JSON.stringify({ 'extra.confirm': false }) : undefined;

    const { data } = await axios(`admin/users`, {
      params: {
        limit: import.meta.env.VITE_USER,
        page: pageParam,
        custom: custom,
      },
    });
    console.log(data);
    return { users: data?.item, nextPage: data?.item?.length > 0 ? pageParam + 1 : undefined };
  };

  const {
    data: userList,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['userList', isUpgradeUserList],
    queryFn: fetchStores,
    suspense: true,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (isPageEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isPageEnd]);

  console.log(userList);

  const handleLogout = () => {
    setUserData(null);
    clearUserDataStorage();
  };

  const handleUpgradeToggle = () => {
    setIsUpgradeUserList((prevMode) => !prevMode);
  };

  return (
    <Section>
      <S.AdminWrapper>
        <S.AdminHeader>
          <Text typography="display_l" display="block" color="black">
            회원 목록
          </Text>
          <SimpleButton onClick={handleUpgradeToggle}>{isUpgradeUserList ? '전체 회원' : '등업 가능 회원'} </SimpleButton>
          <SimpleButton onClick={handleLogout}>로그아웃</SimpleButton>
        </S.AdminHeader>

        <S.Ul>
          {userList?.pages?.map((page) => page.users.map((memberItemData) => <MemberCard key={memberItemData._id} memberItemData={memberItemData} />))}
          <div ref={ref} />
          {isFetching && hasNextPage && <Loader />}
        </S.Ul>
      </S.AdminWrapper>
    </Section>
  );
}

export default MemberList;
