import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

import x from "images/x.svg";

interface TextFieldDialog {
  onChange: (value: string) => void;
  value: string | number | undefined;
}

function TextFieldDialog({ onChange, value }: TextFieldDialog) {
  const [postal, setPostal] = React.useState(value);

  const actionChange = (e: any) => {
    onChange(e.target.value);
    setPostal(e.target.value);
  };

  const handleChange = (e: any) => actionChange(e);

  const onReset = () => {
    setPostal("");
    onChange("");
  };

  return (
    <Wrapper>
      <Input
        defaultValue="0"
        type="string"
        value={postal}
        onChange={handleChange}
      />
      <IconBox>
        <ReactSVG path={x} onClick={onReset} />
      </IconBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  margin: 0 0 24px 0;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export default TextFieldDialog;
