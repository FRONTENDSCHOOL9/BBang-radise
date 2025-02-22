import styled from 'styled-components';

export const LoginWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media all and (min-width: 768px) {
    position: relative;
    padding-top: 120px;
    max-width: 500px;
  }
`;

export const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media all and (min-width: 768px) {
    width: 86%;
  }
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
`;

export const LoginButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
