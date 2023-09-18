import { Formik } from "formik";
import React from "react";
import ReactSVG from "react-svg";
import * as Yup from "yup";

import TextField from "@components/atoms/FormComponents/TextField";

import ButtonIcon from "../ButtonIcon";
import * as S from "./styles";

import Check from "images/Check.svg";
import x from "images/x.svg";

const validateRegisterSchema = Yup.object().shape({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

function EditPasswordDialog({
  hide,
  title,
  setPasswordChange,
  initialValue,
  text,
}: any) {
  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{title}</S.Title>
        <S.IconBox onClick={() => hide()}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <S.Text>{text}</S.Text>

        <Formik
          initialValues={initialValue}
          validationSchema={validateRegisterSchema}
          onSubmit={values => {
            const { oldPassword, newPassword } = values;
            setPasswordChange({ oldPassword, newPassword });
            hide();
          }}
        >
          {({ values, handleSubmit, handleChange, ...formikProps }) => (
            <form>
              <TextField
                title="Current password"
                value={values.oldPassword}
                name="oldPassword"
                type="password"
                {...formikProps}
                onChange={handleChange}
              />
              <S.Spacing />
              <TextField
                title="New password"
                type="password"
                value={values.newPassword}
                name="newPassword"
                {...formikProps}
                onChange={handleChange}
              />
              <S.Spacing />
              <TextField
                type="password"
                title="Repeat new password"
                value={values.confirmPassword}
                name="confirmPassword"
                {...formikProps}
                onChange={handleChange}
              />
              <S.Spacing />
              <ButtonIcon
                onClick={handleSubmit}
                bgColor="#FF6347"
                icon={Check}
                text="Save changes"
              />
            </form>
          )}
        </Formik>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default EditPasswordDialog;
