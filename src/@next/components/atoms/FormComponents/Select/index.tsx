/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import Select from "react-select";
import styled from "styled-components";

import "./style.scss";

interface IProps {
  title?: string;
  value?: string;
  onChange?: any;
  errors?: any;
  options?: any;
  name?: string;
  isDisable?: boolean;
}

const customizeStyle = {
  // control: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   // width: 200,
  // }),
};

function SelectCustomize({
  title,
  errors,
  onChange,
  options,
  value,
  name,
  isDisable = false,
}: IProps) {
  const handleSelectChange = (value?: any) => {
    if (onChange) {
      onChange(value, name);
    }
  };
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Select
        name={name}
        className="customize-select"
        styles={customizeStyle}
        options={options}
        value={value}
        onChange={handleSelectChange}
        isDisabled={isDisable}
      />
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

export default SelectCustomize;
