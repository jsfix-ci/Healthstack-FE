import styled from 'styled-components';

export const GrayWrapper = styled.div`
  background: #f5f5f5;
  border-radius: 4px;
  height: 100%;
  padding: 1rem;
  /* padding-bottom: 30rem; */
  overflow-y: scroll;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  transition: width 2s, height 4s;

  &.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 400px) {
    padding: 0.4rem;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  & div span {
    margin-top: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 400px) {
    flex-direction: column;

    & button {
      width: 100%;
      margin: 4px 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  & button {
    margin-right: 4px;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 0.2rem;
    width: 100%;
    padding: 0 0.5rem;

    & button {
      width: 100%;
      margin-top: 0.2rem;
    }
  }
`;
