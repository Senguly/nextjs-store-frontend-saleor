/* eslint-disable react/require-default-props */
import React from "react";
import ReactSVG from "react-svg";

import * as S from "./styles";

import "./scss/index.scss";

interface IProps {
  iconUrl?: any;
  title?: string;
  onClick?: any;
  fullWidth?: boolean;
  isUser?: boolean;
}

function CustomizeButton(props: IProps) {
  const { iconUrl, title, onClick, fullWidth = true, isUser = false } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <S.Wrapper
      className="main-menu__icon2"
      onClick={handleClick}
      style={{ width: !fullWidth && "fit-content" }}
      isUser={isUser}
    >
      {iconUrl && (
        <S.IconBox className="btn-responsive">
          <ReactSVG path={iconUrl} />
        </S.IconBox>
      )}
      {title && <S.Title className="title_button">{title}</S.Title>}
    </S.Wrapper>
  );
}

export default CustomizeButton;
