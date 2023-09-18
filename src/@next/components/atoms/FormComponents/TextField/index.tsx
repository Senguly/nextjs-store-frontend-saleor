/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import styled from "styled-components";

interface IProps {
  title?: string;
  value?: string;
  onChange?: any;
  name?: any;
  disable?: boolean;
  type?: any;
  action?: any;
}

function TextField({
  type,
  disable,
  title,
  onChange,
  name,
  action,
  ...props
}: IProps) {
  const { touched, errors, handleBlur }: any = props;
  const hasError = touched[name] && errors[name];

  return (
    <Wrapper>
      <Title>{title}</Title>
      <TextBox action={action}>
        <Input
          name={name}
          type={type || "text"}
          {...props}
          onBlur={handleBlur}
          onChange={onChange}
          disabled={disable || false}
          action={action}
        />
      </TextBox>

      {hasError && <HelperText>{errors[name]}</HelperText>}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Title = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 400;
  color: #808080;
`;

const TextBox = styled.div<{ action?: boolean; error?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.error ? "red" : "#dcdcdc")};
  border-radius: 8px;
  display: flex;

  ${props => (props.action === true ? "padding: 0; border: 0px;" : null)}
`;

const Input = styled.input<{ action?: boolean }>`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  ${props =>
    props.action === true
      ? "background: #fff ;font-size: 16px; font-weight: 400; line-height: 24px; color: #222222; "
      : null}
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: red;
`;

export default TextField;
