import styled from 'styled-components';

export const AdminWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100px;
  display: flex;
  flex-direction: column;

  @media all and (min-width: 768px) {
    width: 100%;
    position: relative;
    padding-top: 120px;
    padding-right: 10px;
  }
`;

export const Ul = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  border-radius: 16px;
`;

export const AdminHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
