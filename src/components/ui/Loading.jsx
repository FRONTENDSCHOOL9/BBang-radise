import Lottie from 'lottie-react';
import loadingIndicator from '@assets/lottie/loadingIndicator.json';
import loader from '@assets/lottie/loader.json';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export function Loading() {
  return (
    <>
      <LoadingWrapper>
        <Lottie animationData={loadingIndicator} width={100} height={100} aria-labelledby="loading animation" />
      </LoadingWrapper>
    </>
  );
}

export function Loader() {
  return (
    <>
      <Lottie animationData={loader} aria-labelledby="loading animation" />;
    </>
  );
}
