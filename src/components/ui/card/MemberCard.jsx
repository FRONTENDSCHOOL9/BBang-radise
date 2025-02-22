import DefaultProfile from '@assets/DefaultProfile';
import Button from '@components/ui/button/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAdminApis from '@hooks/apis/useAdminApis.mjs';

const Li = styled.li`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e2e2;
`;

const StCard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0 auto;
  justify-content: space-around;
`;

const ImgWrap = styled.div`
  width: 80px;
  height: 150px;
`;

const Img = styled.img`
  width: 100%;
  object-fit: fill;
  border-radius: 16px;
`;

const MemberInfo = styled.div`
  display: flex;
`;

const TextInfo = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
  width: 60%;
  justify-content: space-evenly;
  flex-direction: column;
`;

const MemberTypeChip = styled.div`
  padding: 5px 4px;
  width: 146px;
  color: var(--white);
  text-align: center;
  border-radius: 20px;
  background-color: var(--primary-01);
  font-size: 16px;
  font-weight: 600;
`;

const Name = styled.p`
  font-weight: 600;
  font-size: 20px;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Instruction = styled.span`
  font-size: 18px;
  color: var(--black);
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function MemberCard({ memberItemData }) {
  const { _id, name, email, phone, type, instruction, profileImage, extra } = memberItemData;
  const { patchUserRankUp } = useAdminApis();

  const handleRankUpClick = () => {
    patchUserRankUp(_id);
  };

  return (
    <>
      <Li>
        <StCard>
          <MemberInfo>
            <ImgWrap>
              {profileImage && profileImage.length > 0 ? (
                <Img src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${profileImage}`} alt="프로필 이미지" />
              ) : (
                <DefaultProfile width={71} stroke="gray" />
              )}
            </ImgWrap>
            <TextInfo>
              <Instruction>{_id}</Instruction>
              <MemberTypeChip>{type}</MemberTypeChip>
              <Name>{name}</Name>
              <Instruction>{instruction}</Instruction>
            </TextInfo>
          </MemberInfo>
          <div>
            <span>{email}</span>
          </div>
          <div>
            <span>{phone}</span>
          </div>
        </StCard>
        {extra?.confirm === false ? <Button onClick={handleRankUpClick}>등업 승인하기</Button> : null}
      </Li>
    </>
  );
}

export default MemberCard;

MemberCard.propTypes = {
  memberItemData: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    type: PropTypes.string,
    instruction: PropTypes.string,
    profileImage: PropTypes.string,
    extra: PropTypes.object,
  }),
};
