import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 24px;
  width: 350px;
  @media screen and (max-width: 414px) {
    width: 414px !important;
    border-radius: 8px 8px 0px 0px;
  }

  @media screen and (max-width: 717px) {
    width: 100% !important;
    border-radius: 8px 8px 0px 0px;
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

// content

export const ContentWrap = styled.div``;

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
