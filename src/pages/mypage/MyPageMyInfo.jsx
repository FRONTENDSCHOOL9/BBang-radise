import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserInfo } from '@hooks/queries/user';
import { useState } from 'react';
import useMemberStore from '@zustand/memberStore.mjs';
import SimpleButton from '@pages/mypage/SimpleButton';
import * as S from '@styles/mypage/mypage.style';
import Text from '@components/ui/Text';
import Badge from '@components/ui/Badge';
import Toast from '@components/ui/Toast';
import DefaultProfile from '@assets/DefaultProfile';
import useUserApis from '@hooks/apis/useUserApis.mjs';

function MyPageMyInfo() {
  const { _id } = useParams();
  const { data } = useGetUserInfo(_id);
  const navigate = useNavigate();
  const setUserData = useMemberStore((state) => state.setUser);
  const clearUserDataStorage = useMemberStore.persist.clearStorage;
  const [showToast, setShowToast] = useState(false);
  const { patchRequestRankUp } = useUserApis();

  const user = data?.item;
  console.log(user);

  const isValid = user.posts >= 5;
  console.log(isValid);

  const handleLogout = () => {
    setUserData(null);
    clearUserDataStorage();
    setShowToast(true);
  };

  const handleRankUpRequest = () => {
    patchRequestRankUp(_id);
  };

  //TODO: 토스트 이동 후에 안 뜸
  return (
    <S.MyPageWrapper>
      {showToast && <Toast setToast={setShowToast} text="로그아웃되었습니다." />}
      {user && (
        <S.MyPageInfo>
          {user.profileImage && user.profileImage.length > 0 ? (
            <S.MyPageProfileImage src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${user.profileImage}`} alt="프로필 이미지" />
          ) : (
            <DefaultProfile width={71} stroke="gray" />
          )}
          <S.MyPageInfoUser>
            <Text typography="extrabold_l" display="block">
              {user.name}
            </Text>
            <Text typography="medium_s">{user.email}</Text>
          </S.MyPageInfoUser>
          <Badge type="beginner" />

          <Text typography="light_s">{user.introduction ? user.introduction : null}</Text>

          <S.MyPageInfoButtonWrapper>
            <SimpleButton onClick={handleRankUpRequest} disabled={isValid ? false : true}>
              베이킹 마스터로 승급하기
            </SimpleButton>

            <S.MyPageInfoButtonBottom>
              <SimpleButton
                onClick={() => {
                  navigate(`/mypage/${_id}/edit`);
                }}
              >
                내 정보 수정
              </SimpleButton>
              <SimpleButton onClick={handleLogout}>로그아웃</SimpleButton>
            </S.MyPageInfoButtonBottom>
          </S.MyPageInfoButtonWrapper>
        </S.MyPageInfo>
      )}
    </S.MyPageWrapper>
  );
}

export default MyPageMyInfo;
