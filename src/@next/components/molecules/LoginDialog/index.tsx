import { useAuth } from "@saleor/sdk";
import { Formik } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";
import * as Yup from "yup";

import ButtonIcon from "../ButtonIcon";
import InputLogin from "./components/InputLogin";
import * as S from "./styles";

import Email from "images/Email.svg";
import Key from "images/Key.svg";
import x from "images/x.svg";

function LoginDialog({ hide, setIsOpenRegister, setIsOpenResetPassword }: any) {
  const { signIn } = useAuth();
  const alert = useAlert();
  const { t } = useTranslation();

  const validateLoginSchema = Yup.object().shape({
    email: Yup.string().required().email(t("Invalid email!")),
    password: Yup.string().required(),
  });

  const [, setLoading] = React.useState(false);

  const handleLogin = async (values: any) => {
    const { email, password } = values;
    setLoading(true);
    const { data, dataError } = await signIn(email, password);
    setLoading(false);
    if (dataError?.error) {
      const { message } = dataError?.error[0];

      alert.show(
        {
          title: message,
        },
        { type: "error", timeout: 5000 }
      );
    } else if (data && hide) {
      hide();
    }
  };
  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{t("Login ")}</S.Title>
        <S.IconBox onClick={() => hide()}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <S.Text>
          {t("Log in using your email to continue. No account yet?")}{" "}
          <span
            style={{ color: "#ff6347", cursor: "pointer" }}
            onClick={() => {
              hide();
              setIsOpenRegister(true);
            }}
          >
            {t("Sign up")}
          </span>
        </S.Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validateLoginSchema}
          onSubmit={values => handleLogin(values)}
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
                title={t("Password")}
                subTitle={t("Forgot password?")}
                name="password"
                iconSrc={Key}
                type="password"
                {...formikProps}
                onChange={handleChange}
                onSubTitleClick={() => {
                  hide();
                  setIsOpenResetPassword(true);
                }}
              />
              <S.Spacing />
              <ButtonIcon
                onClick={handleSubmit}
                bgColor="#FF6347"
                text={t("Log in")}
              />
            </form>
          )}
        </Formik>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default LoginDialog;
