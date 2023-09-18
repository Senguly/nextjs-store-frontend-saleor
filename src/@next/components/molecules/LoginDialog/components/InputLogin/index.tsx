import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

interface IProps {
  title?: string;
  value?: string;
  onChange?: any;
  name?: any;
  iconSrc?: any;
  type?: string;
  subTitle?: string;
  onSubTitleClick?: any;
}

function InputLogin({
  title,
  subTitle,
  onChange,
  iconSrc,
  type,
  name,
  onSubTitleClick,
  ...props
}: IProps) {
  const { touched, errors, handleBlur }: any = props;
  const hasError = touched[name] && errors[name];
  return (
    <Wrapper>
      <TitleWrap>
        <Title>{title}</Title>
        <SubTitle onClick={onSubTitleClick}>{subTitle}</SubTitle>
      </TitleWrap>
      <TextBox>
        <IconBox>
          <ReactSVG path={iconSrc} />
        </IconBox>
        <Input
          name={name}
          type={type || "text"}
          {...props}
          onBlur={handleBlur}
          onChange={onChange}
        />
      </TextBox>

      {hasError && <HelperText>{errors[name]}</HelperText>}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconBox = styled.div`
  div {
    div {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }
  }
  svg * {
    fill: #dcdcdc;
  }
  margin-right: 8px;
`;

const Title = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 400;
  color: #808080;
`;

const SubTitle = styled(Title)`
  cursor: pointer;
`;

const TextBox = styled.div<{ error?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.error ? "red" : "#dcdcdc")};
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: red;
`;

export default InputLogin;
