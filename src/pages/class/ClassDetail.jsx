import Badge from '@components/ui/Badge';
import Modal from '@components/ui/Modal';
import Section from '@components/ui/Section';
import Text from '@components/ui/Text';
import BookmarkButton from '@components/ui/button/BookmarkButton';
import Button from '@components/ui/button/Button';
import { useGetClassDetail } from '@hooks/queries/class';
import useModal from '@hooks/useModal';
import useBadge from '@hooks/utils/useBadge';
import {
  ClassDetailBadge,
  ClassDetailBookmark,
  ClassDetailButton,
  ClassDetailContent,
  ClassDetailCover,
  ClassDetailImgCover,
  ClassDetailInfo,
  ClassDetailInfoBottom,
  ClassDetailInfoDate,
  ClassDetailInfoMiddle,
  ClassDetailInfoTop,
  ClassDetailInfoUser,
  ClassDetailWrapper,
  SwiperWrapper,
} from '@styles/class/classDetail.style';
import useMemberStore from '@zustand/memberStore.mjs';
import { useNavigate, useParams } from 'react-router-dom';

import { register } from 'swiper/element/bundle';
register();

function ClassDetail() {
  const { _id } = useParams();
  const { data } = useGetClassDetail(_id);
  const navigate = useNavigate();

  const item = data?.item;

  const { badgeType, quantityColor, textColor, expired } = useBadge(item);

  const mainImage = item?.mainImages[0].name;
  const detailImages = item?.extra?.detailImages?.map((image) => (
    <swiper-slide key={image.name}>
      <img src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${image.name}`} />
      {expired && <ClassDetailImgCover />}
    </swiper-slide>
  ));

  const { isOpen, handleModalToggle } = useModal();
  const user = useMemberStore().user;

  const handleBuyClass = () => {
    if (!user) {
      handleModalToggle();
    } else {
      navigate(`/class`);
    }
  };

  const priceData = item?.price;
  const price = priceData?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Section>
      <ClassDetailWrapper>
        <ClassDetailCover>
          <SwiperWrapper>
            <swiper-container slides-per-view="auto" centered-slides="true" space-between="10" autoplay-delay="3500" autoplay-pause-on-mouse-enter="true" speed="1200">
              <swiper-slide>
                <img src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${mainImage}`} alt="클래스 이미지" />
                {expired && <ClassDetailImgCover />}
              </swiper-slide>
              {detailImages}
            </swiper-container>
          </SwiperWrapper>

          <ClassDetailBadge>
            <Badge type={badgeType} />
          </ClassDetailBadge>

          <ClassDetailBookmark>
            <BookmarkButton />
          </ClassDetailBookmark>
        </ClassDetailCover>

        <ClassDetailInfo>
          <ClassDetailInfoTop>
            <Text typography="black_xl" color={textColor} display="block">
              {item?.name}
            </Text>

            <ClassDetailInfoMiddle>
              <ClassDetailInfoDate>
                <Text typography="bold_l" color={textColor} display="block">
                  {item?.extra?.classAt}
                </Text>
                <Text typography="semibold_l" color={textColor} display="block" className="class-date">
                  {item?.extra?.startAt} ~ {item?.extra?.endAt}
                </Text>
              </ClassDetailInfoDate>

              <ClassDetailInfoUser>
                <Text typography="extrabold_l" color={textColor} display="block">
                  {item?.extra?.address}
                </Text>
                <Text typography="extrabold_l" color={textColor} display="block">
                  {item?.seller?.name}
                </Text>
              </ClassDetailInfoUser>
            </ClassDetailInfoMiddle>

            <ClassDetailInfoBottom>
              <Text typography="display_xl" color={quantityColor} display="block">
                {item?.buyQuantity}/{item?.quantity}명
              </Text>
              <Text typography="black_xl" color={textColor} display="block">
                {price}원
              </Text>
            </ClassDetailInfoBottom>

            <ClassDetailButton>
              {badgeType == 'inactive' ? <Button disabled>모집이 종료된 클래스입니다</Button> : null}
              {badgeType == 'closed' ? <Button color="var(--primary-02)">모집이 마감된 클래스입니다</Button> : null}
              {badgeType == 'queue' ? <Button color="var(--secondary-03)">클래스 오픈을 기다려주세요!</Button> : null}
              {badgeType == 'active' ? (
                <Button color="var(--primary-01)" onClick={handleBuyClass}>
                  클래스 신청하기
                </Button>
              ) : null}
              <Modal
                isOpen={isOpen}
                handleModalToggle={handleModalToggle}
                handleConfirmClick={() => navigate(`/login`)}
                contentText="베이킹 클래스는 빵라다이스의 주민들을 위한 활동입니다. 로그인 후 빵라다이스를 즐겨주세요!"
                confirmText="로그인"
                closeText="돌아가기"
              />
            </ClassDetailButton>
          </ClassDetailInfoTop>

          <ClassDetailContent>
            <Text typography="regular_m" color={textColor} display="block">
              {item?.content}
            </Text>
          </ClassDetailContent>
        </ClassDetailInfo>
      </ClassDetailWrapper>
    </Section>
  );
}

export default ClassDetail;
