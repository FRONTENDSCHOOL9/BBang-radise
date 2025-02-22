import Text from '@components/ui/Text';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HomeMobileIcon from '@assets/HomeMobileIcon.svg';
import HomeWebIcon from '@assets/HomeWebIcon.svg';
import { useEffect, useState } from 'react';
import useMemberStore from '@zustand/memberStore.mjs';

const HeaderStyle = styled.header`
  display: flex;
  position: fixed;
  width: 100%;
  padding: 20px 17px 0px 16px;
  align-items: center;
  gap: 13px;
  z-index: 999999;

  @media all and (min-width: 768px) {
    padding: 20px 33px 0px 33px;
    gap: 30px;
  }
`;

const LogoLayout = styled.div`
  padding-top: 2px;
  @media all and (min-width: 768px) {
    padding-top: 5px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  height: 42px;
  flex-grow: 1;
  justify-content: space-between;
  backdrop-filter: blur(5px);
  padding: 6px 33px 0px 33px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
  border: solid 1px rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease-in-out;

  @media all and (min-width: 768px) {
    justify-content: flex-end;
    height: 56px;
    padding: 10.5px 38px 0px 34px;
    gap: 50px;

    &:hover {
      background-color: var(--primary-01);
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    &:after {
      content: '';
      display: block;
      background-color: black;
      width: 100%;
      height: 1.3px;
    }
  }
`;

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, []);

  const user = useMemberStore((state) => state.user);
  const id = user?._id;

  return (
    <HeaderStyle>
      <Link to="/">
        <LogoLayout>{isMobile < 768 ? <img src={HomeMobileIcon} /> : <img src={HomeWebIcon} />}</LogoLayout>
      </Link>
      <Navigation>
        <li>
          {user ? (
            user.type === 'admin' ? (
              <StyledNavLink to={`/admin`}>
                <Text typography="display_m">Admin</Text>
              </StyledNavLink>
            ) : (
              <StyledNavLink to={`mypage/${id}`}>
                <Text typography="display_m">내정보</Text>
              </StyledNavLink>
            )
          ) : (
            <StyledNavLink to="/login">
              <Text typography="display_m">로그인</Text>
            </StyledNavLink>
          )}
        </li>
        <li>
          <StyledNavLink to="/class">
            <Text color="black" typography="display_m">
              클래스
            </Text>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/recipe">
            <Text color="black" typography="display_m">
              레시피
            </Text>
          </StyledNavLink>
        </li>
      </Navigation>
    </HeaderStyle>
  );
}

export default Header;
