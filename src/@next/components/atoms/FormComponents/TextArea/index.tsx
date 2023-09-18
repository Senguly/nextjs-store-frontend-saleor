/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import styled from "styled-components";

interface IProps {
  title?: string;
  value?: string;
  onChange?: any;
  name?: any;
}

function TextArea({ title, onChange, name, ...props }: IProps) {
  const { handleBlur }: any = props;
  // if (touched) {
  //   const hasError = touched[name] && errors[name];
  // }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <TextBox>
        <Input name={name} onBlur={handleBlur} onChange={onChange} />
      </TextBox>

      {/* {hasError && <HelperText>{errors[name]}</HelperText>} */}
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

const TextBox = styled.div<{ error?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.error ? "red" : "#dcdcdc")};
  border-radius: 8px;
  display: flex;
`;

const Input = styled.textarea`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  cols: 5;
`;

// const HelperText = styled.p`
//   margin: 0;
//   font-size: 12px;
//   font-weight: 400;
//   color: red;
// `;

export default TextArea;
