import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px 8px 0 0;
  border: 1px solid #dcdcdc;
  padding: 24px;
  width: 730px;
  @media screen and (max-width: 414px) {
    width: 414px !important;
  }

  @media screen and (max-width: 717px) {
    width: 100% !important;
  }
`;

// header

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h4`
  margin: 0;
  font-weight: 600;
`;

export const IconBox = styled.div`
  cursor: pointer;

  svg * {
    transition: 0.6s;
    cursor: pointer;
  }
  &:hover {
    svg * {
      fill: #ff6347;
    }
  }
`;

export const Item = styled.div`
  width: 49%;
  margin: 0 0 24px 0;
  @media screen and (max-width: 768px) {
    &.responsive {
      width: 100%;
    }
  }
`;

// content

export const ContentWrap = styled.div`
  // overflow: scroll;
`;

export const Form = styled.form`
  max-height: calc(100vh - 140px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SubText = styled.p``;
export const Spacing = styled.div`
  width: 100%;
  height: 24px;
`;

export const SelectBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SelectItem = styled.div`
  width: 48%;
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0 0 24px 0;
`;

export const PickupText = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 24px 0;
`;
