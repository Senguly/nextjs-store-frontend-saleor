import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 24px 0 0 0;
  width: 100%;
`;

export const Container2 = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 165px;
  border-radius: 8px;
  overflow: hidden;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 24px;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Parallax = styled.div<{ bgUrl?: any }>`
  background: linear-gradient(
      0deg,
      rgba(34, 34, 34, 0.48),
      rgba(34, 34, 34, 0.48)
    ),
    url(${props => props.bgUrl});
  min-height: 90vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 768px) {
    background: none;
  }
`;

export const Wrapper = styled.div`
  width: 730px;
  //   min-height: 100vh;
  // border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 24px;
  background: #fff;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`;

export const Wrapper2 = styled.div`
  width: 350px;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    width: 100% !important;
    padding: 24px 0 48px 0;
    margin-top: 24px;
    border-top: 1px solid #dcdcdc;
    // display: none;
  }
`;

export const Wrapper3 = styled.div`
  width: 350px;
  display: flex;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;

  @media screen and (max-width: 768px) {
    width: 100% !important;
    padding: 24px 0 48px 0;
    margin-top: 24px;
    border: 0;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 376px) {
    width: 100% !important;
    padding: 0;
    border: 0;
  }
`;

export const OrderDetail = styled.div``;

export const Header = styled.div``;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const HeadText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: #808080;
`;

export const Divider = styled.div`
  margin: 24px 0;
  height: 1px;
  width: 100%;
  background: #dcdcdc;
`;

export const PickupDetail = styled.div``;

export const PickupTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

export const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 4px 0;
  color: #808080;
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #222222;
  margin: 0 0 0 0;
  &.mb-16 {
    margin-bottom: 16px;
  }
`;

export const IconBox = styled.div`
  div > div {
    display: flex;
  }
`;

export const SubImage = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #ff6347;
  margin: 24px auto;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 48px;
    height: 48px;
    color: #fff;

    path {
      fill: #fff;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Link = styled.div`
  margin: 24px 0 0;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdcdc;
  border-radius: 8px;

  a {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-left: 8.67px;
  }
`;
