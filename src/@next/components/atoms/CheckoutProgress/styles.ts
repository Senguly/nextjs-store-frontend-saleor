import styled from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.h4`
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
`;

export const ProgressBarConTainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
`;

export const ProgressBar = styled.div<{ stt?: boolean }>`
  height: 4px;
  width: 100%;
  background: ${props => (props.stt ? "#28A745" : "#dcdcdc")};
  border-radius: 8px;
  margin: 0 0 8px 0;
`;

export const ProgressTitle = styled.p<{ stt?: boolean }>`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${props => !props.stt && "#dcdcdc"};
`;

export const ProgressTime = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #808080;
  margin: 0;
`;
