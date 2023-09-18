import { Formik } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";
import * as Yup from "yup";

import { paths } from "@paths";

// import { channelSlug } from "@temp/constants";
import { TypedPasswordResetRequestMutation } from "../../../../components/PasswordResetRequestForm/queries";
import ButtonIcon from "../ButtonIcon";
import InputLogin from "../LoginDialog/components/InputLogin";
import * as S from "./styles";

import Email from "images/Email.svg";
import x from "images/x.svg";

function ForgotPasswordDialog({
  hide,
  setIsOpenResetSuccess,
  channelSlug,
}: any) {
  const alert = useAlert();
  const { t } = useTranslation();

  const validateRegisterSchema = Yup.object().shape({
    email: Yup.string().required().email(t("Invalid email!")),
  });

  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{t("Forgot password")}</S.Title>
        <S.IconBox onClick={() => hide()}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <S.Text>
          {t(
            "Enter your email address below to receive a password reset link."
          )}
        </S.Text>
        <TypedPasswordResetRequestMutation
          onCompleted={data => {
            if (data?.requestPasswordReset?.errors?.length === 0) {
              setIsOpenResetSuccess(true);
            } else {
              alert.show(
                {
                  title: `${data?.requestPasswordReset?.errors[0].message}`,
                },
                { type: "error" }
              );
            }
          }}
        >
          {(passwordReset, { loading, data }) => {
            return (
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validateRegisterSchema}
                onSubmit={values => {
                  passwordReset({
                    variables: {
                      email: values.email,
                      redirectUrl: `${location.origin}${paths.passwordReset}`,
                      channel: channelSlug,
                    },
                  });
                  // setIsOpenResetSuccess(true);
                }}
              >
                {({ values, handleSubmit, handleChange, ...formikProps }) => (
                  <form>
                    <InputLogin
                      title={t("Email address")}
                      name="email"
                      iconSrc={Email}
                      {...formikProps}
                      onChange={handleChange}
                    />
                    <S.Spacing />
                    <ButtonIcon
                      onClick={handleSubmit}
                      bgColor="#FF6347"
                      text={t("Reset password")}
                    />
                  </form>
                )}
              </Formik>
            );
          }}
        </TypedPasswordResetRequestMutation>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default ForgotPasswordDialog;
