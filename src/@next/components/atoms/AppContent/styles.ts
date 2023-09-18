import styled from "styled-components";

export const Wrapper = styled.div<{ backgroundUrl?: string }>`
  padding: 24px;
  background: linear-gradient(
      0deg,
      rgba(34, 34, 34, 0.48),
      rgba(34, 34, 34, 0.48)
    ),
    url(${props => props.backgroundUrl});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  width: 730px;
  @media screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

export const HeroContent = styled.div``;

export const ImageBox = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Name = styled.h2`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  margin: 16px 0;
`;

export const RestaurantWrap = styled.div`
  /* border-bottom: 1px solid #dcdcdc; */
  padding: 0 0 16px 0;
`;

export const Hr = styled.div`
  background-color: #dcdcdc;
  width: 100%;
  height: 1px;
`;

export const InfoWrap = styled.div``;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const IconBox = styled.div`
  margin-right: 8px;
  &.info {
    margin: 0 0 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const Info = styled.p`
  color: #fff;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
`;

export const OpenWrap = styled.div`
  display: flex;
`;

export const OpenItem = styled.div`
  /* display: flex; */
  align-items: center;
`;

export const Status = styled.div<{ isActive?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => (props.isActive ? "#4caf50" : "#d63031")};
  margin-right: 4px;
  margin-top: 10px;
  margin-left: 5px;
`;

export const OpenText = styled.p`
  color: #fff;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  display: block;
`;

export const FeeWrap = styled.div`
  display: flex;
  padding-top: 16px;
  flex-wrap: wrap;

  @media screen and (max-width: 414px) {
    justify-content: space-between;
  }
`;

export const FeeItem = styled.div`
  margin-right: 24px;
`;

export const Title = styled.p`
  color: #dcdcdc;
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 400;
`;

export const Price = styled.p`
  color: #fff;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;
