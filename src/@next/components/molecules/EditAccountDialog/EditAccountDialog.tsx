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
  email: Yup.string().required().email("Invalid email!"),

  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

function EditAccountDialog({
  hide,
  title,
  setAccountUpdate,
  initialValue,
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
        <Formik
          initialValues={initialValue}
          validationSchema={validateRegisterSchema}
          onSubmit={values => {
            const { firstName, lastName } = values;
            setAccountUpdate({ input: { firstName, lastName } });
            hide();
          }}
        >
          {({ values, handleSubmit, handleChange, ...formikProps }) => (
            <form>
              <TextField
                title="Email address"
                value={values.email}
                name="email"
                {...formikProps}
                onChange={handleChange}
                disable
                action
              />
              <S.Spacing />
              <TextField
                title="First name"
                value={values.firstName}
                name="firstName"
                {...formikProps}
                onChange={handleChange}
              />
              <S.Spacing />
              <TextField
                title="Last name"
                value={values.lastName}
                name="lastName"
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

export default EditAccountDialog;
