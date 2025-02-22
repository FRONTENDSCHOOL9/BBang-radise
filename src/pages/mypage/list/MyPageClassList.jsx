import Text from '@components/ui/Text';
import ClassCard from '@components/ui/card/ClassCard';
import PropTypes from 'prop-types';
import { useGetMyClassList } from '@hooks/queries/user';
import { ClassListContent } from '@styles/class/classList.style';
import { MyPageListAlert } from '@styles/mypage/mypageList.style';
import { useNavigate } from 'react-router-dom';

MyPageClassList.propTypes = {
  myCreateClass: PropTypes.object,
  isLoading: PropTypes.any,
  error: PropTypes.string,
};

function MyPageClassList() {
  const { data: myCreateClass } = useGetMyClassList();
  const navigate = useNavigate();

  const classList = myCreateClass?.item.map((item) => <ClassCard key={item._id} item={item} />);

  return (
    <>
      {myCreateClass.item.length > 0 ? (
        <ClassListContent>{classList}</ClassListContent>
      ) : (
        <MyPageListAlert>
          <Text typography="regular_m" color="gray06" onClick={() => navigate(`/class/add`)}>
            아직 개설하신 클래스가 없습니다
            <br />
            <br />
            빵으로 가득찬 빵라다이스를 위하여 베이킹 마스터님의 빵에 대한 사랑을 나누어주세요
            <br />
            <br />- 베이킹 클래스 개설하기 -
          </Text>
        </MyPageListAlert>
      )}
    </>
  );
}

export default MyPageClassList;
