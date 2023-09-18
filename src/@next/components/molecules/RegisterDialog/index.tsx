import { Formik } from "formik";
import React from "react";
import { AlertManager, useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { IntlShape, useIntl } from "react-intl";
import ReactSVG from "react-svg";
import * as Yup from "yup";

// import { channelSlug } from "@temp/constants";
import { maybe } from "@utils/misc";

import { RegisterAccount } from "../../../../components/OverlayManager/Login/gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "../../../../components/OverlayManager/Login/queries";
import ButtonIcon from "../ButtonIcon";
import InputLogin from "../LoginDialog/components/InputLogin";
import * as S from "./styles";

import Email from "images/Email.svg";
import Key from "images/Key.svg";
import x from "images/x.svg";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  intl: IntlShape
) => {
  const successful = maybe(() => !data?.accountRegister?.errors?.length);
  if (successful) {
    hide();
    alert.show(
      {
        title: data?.accountRegister?.requiresConfirmation
          ? intl.formatMessage({
              defaultMessage:
                "Please check your e-mail for further instructions",
            })
          : intl.formatMessage({ defaultMessage: "New user has been created" }),
      },
      { type: "success", timeout: 5000 }
    );
  } else {
    hide();
    alert.show(
      {
        title: data?.accountRegister?.errors[0].message,
      },

      { type: "error", timeout: 5000 }
    );
  }
};

function RegisterDialog({
  hide,
  setIsOpenLogin,
  setIsOpenRegisterSuccess,
  channelSlug,
}: any) {
  const alert = useAlert();
  const intl = useIntl();
  const { t } = useTranslation();
  const validateRegisterSchema = Yup.object().shape({
    email: Yup.string().required().email(t("Invalid email!")),
    password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      t("Passwords must match")
    ),
  });
  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{t("Sign up")}</S.Title>
        <S.IconBox onClick={() => hide()}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <S.Text>
          {t("Sign up using your email to continue. Already have an account?")}{" "}
          <span
            style={{ color: "#ff6347", cursor: "pointer" }}
            onClick={() => {
              hide();
              setIsOpenLogin(true);
            }}
          >
            {t("Login ")}
          </span>
        </S.Text>
        <TypedAccountRegisterMutation
          onCompleted={data => {
            const successful = maybe(
              () => !data?.accountRegister?.errors?.length
            );
            return showSuccessNotification(
              data,
              () => {
                hide();
                if (successful) {
                  setIsOpenRegisterSuccess(true);
                }
              },
              alert,
              intl
            );
          }}
        >
          {(registerCustomer, { loading, data }) => {
            return (
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  passwordConfirmation: "",
                }}
                validationSchema={validateRegisterSchema}
                onSubmit={values => {
                  const { email, password } = values;
                  registerCustomer({
                    variables: { email, password, channel: channelSlug },
                  });
                }}
              >
                {({ values, handleSubmit, handleChange, ...formikProps }) => (
                  <form>
                    <InputLogin
                      title={t("Email address")}
                      name="email"
                      type="email"
                      iconSrc={Email}
                      {...formikProps}
                      onChange={handleChange}
                    />
                    <S.Spacing />
                    <InputLogin
                      title={t("Password ")}
                      name="password"
                      iconSrc={Key}
                      type="password"
                      {...formikProps}
                      onChange={handleChange}
                    />
                    <S.Spacing />
                    <InputLogin
                      title={t("Repeat Password")}
                      name="passwordConfirmation"
                      iconSrc={Key}
                      type="password"
                      {...formikProps}
                      onChange={handleChange}
                    />
                    <S.Spacing />
                    <ButtonIcon
                      onClick={handleSubmit}
                      bgColor="#FF6347"
                      text={t("Sign up")}
                    />
                  </form>
                )}
              </Formik>
            );
          }}
        </TypedAccountRegisterMutation>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default RegisterDialog;
