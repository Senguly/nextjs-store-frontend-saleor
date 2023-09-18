import React from "react";
import ReactSVG from "react-svg";

import ButtonIcon from "../ButtonIcon";
import * as S from "./styles";

import ArrowLeft from "images/ArrowLeft.svg";
// import User from "images/user.svg";
import x from "images/x.svg";

interface IProps {
  hide?: any;
  setIsOpenLogin?: any;
  title?: any;
  text?: any;
  icon?: any;
  isResetPassword?: any;
  btnText?: any;
}

function SuccessDialog({
  hide,
  setIsOpenLogin,
  title,
  text,
  icon,
  isResetPassword,
  btnText,
}: IProps) {
  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{title || ""}</S.Title>
        {!isResetPassword && (
          <S.IconBox onClick={() => hide()}>
            <ReactSVG path={x} />
          </S.IconBox>
        )}
      </S.Head>
      <S.ContentWrap>
        <S.Spacing />
        <S.Circle>
          <S.IconBoxNotAction>
            <ReactSVG path={icon} />
          </S.IconBoxNotAction>
        </S.Circle>
        <S.Spacing />
        <S.Text>{text || ""}</S.Text>
        <ButtonIcon
          icon={ArrowLeft}
          text={btnText || "Back to Login"}
          onClick={() => {
            if (hide) {
              hide();
            }
            setIsOpenLogin(true);
          }}
        />
        {/* {isResetPassword ? (
          <ButtonIcon icon={User} text="Login" onClick={setIsOpenLogin} />
        ) : (
          
        )} */}
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default SuccessDialog;
