import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMyJoinList, useGetMyRecipeList } from '@hooks/queries/user';
import * as S from '@styles/mypage/mypageList.style';
import Text from '@components/ui/Text';
import { MyPageListAlert } from '@styles/mypage/mypageList.style';
import MyPageBookmarkList from '@pages/mypage/list/bookmark/MyPageBookmarkList';
import MyPageClassList from '@pages/mypage/list/MyPageClassList';
import MyPageJoinList from '@pages/mypage/list/MyPageJoinList';
import MyPageRecipeList from '@pages/mypage/list/MyPageRecipeList';
import useMemberStore from '@zustand/memberStore.mjs';

function MyPageList() {
  const { _id } = useParams();
  // const { data: myCreateClass } = useGetMyClassList();
  const { data: myRecipe } = useGetMyRecipeList(_id);
  const { data: myJoinClass } = useGetMyJoinList();
  const [tab, setTab] = useState(0);

  const user = useMemberStore((state) => state.user);
  const userType = user?.type;

  // const ROLE = {
  //   USER: 'USER',
  //   SELLER: 'SELLER',
  //   ADMIN: 'ADMIN',
  // };

  // useEffect(() => {
  //   setTab(0);
  // }, [userType]);

  return (
    <S.ListWrapper>
      <ul>
        <li>
          <S.Tab>
            <S.ButtonWrapper tab={tab === 0 ? 'true' : 'false'}>
              <S.TabButton onClick={() => setTab(0)}>
                <Text color="gray07" typography="semibold_s">
                  클래스
                </Text>
              </S.TabButton>
            </S.ButtonWrapper>

            <S.ButtonWrapper tab={tab === 1 ? 'true' : 'false'}>
              <S.TabButton onClick={() => setTab(1)}>
                <Text color="gray07" typography="semibold_s">
                  레시피
                </Text>
              </S.TabButton>
            </S.ButtonWrapper>

            <S.ButtonWrapper tab={tab === 2 ? 'true' : 'false'}>
              <S.TabButton onClick={() => setTab(2)} disabled>
                <Text color="gray07" typography="semibold_s">
                  북마크
                </Text>
              </S.TabButton>
            </S.ButtonWrapper>

            <S.ButtonWrapper tab={tab === 3 ? 'true' : 'false'}>
              <S.TabButton onClick={() => setTab(3)}>
                <Text color="gray07" typography="semibold_s">
                  신청 목록
                </Text>
              </S.TabButton>
            </S.ButtonWrapper>
          </S.Tab>
        </li>
      </ul>
      <div>
        {tab === 0 && userType === 'seller' ? (
          <MyPageClassList />
        ) : tab === 0 && userType !== 'seller' ? (
          <MyPageListAlert>
            <Text typography="regular_m" color="gray06">
              클래스는 베이킹 마스터 등급부터 개설하실 수 있습니다
              <br />
              베이킹 레시피 5개 이상 공유 시 승급 신청 가능합니다
              <br />
              (승급까지 최대 3일 소요)
            </Text>
          </MyPageListAlert>
        ) : tab === 1 ? (
          <MyPageRecipeList myRecipe={myRecipe} />
        ) : tab === 2 ? (
          <MyPageBookmarkList />
        ) : tab === 3 ? (
          <MyPageJoinList myJoinClass={myJoinClass} />
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </S.ListWrapper>
  );
}

export default MyPageList;
