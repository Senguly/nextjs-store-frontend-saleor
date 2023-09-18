import React from "react";
import { FormattedMessage } from "react-intl";

import ButtonIcon from "../ButtonIcon";
import InputLogin from "../LoginDialog/components/InputLogin";
import * as S from "./styles";
import { IProps } from "./types";

import Key from "images/Key.svg";

export const ResetPasswordForm: React.FC<IProps> = ({
  handleChange,
  handleSubmit,
  values,
  tokenError,
  passwordError,
  ...formikProps
}: IProps) => {
  // const intl = useIntl();
  return (
    <S.Wrapper>
      <h3>
        <FormattedMessage defaultMessage="Reset your password" />
      </h3>

      <S.Text>
        <FormattedMessage defaultMessage="Please set a new password for your account." />
      </S.Text>
      {tokenError && (
        <S.GeneralError>
          <FormattedMessage defaultMessage="It seems that token for password reset is not valid anymore." />
        </S.GeneralError>
      )}
      <form onSubmit={handleSubmit}>
        <InputLogin
          title="Password"
          name="password"
          iconSrc={Key}
          type="password"
          {...formikProps}
          onChange={handleChange}
        />
        <S.Spacing />
        <InputLogin
          title="Repeat new password"
          name="retypedPassword"
          iconSrc={Key}
          type="password"
          {...formikProps}
          onChange={handleChange}
        />
        <S.Spacing />

        {/* <S.InputFields>
          <TextField
            label={intl.formatMessage(commonMessages.password)}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            errors={
              errors.password || passwordError
                ? [
                    {
                      field: "password",
                      message: errors.password || passwordError,
                    },
                  ]
                : undefined
            }
          />
          <TextField
            label={intl.formatMessage({ defaultMessage: "Retype password" })}
            onBlur={handleBlur}
            name="retypedPassword"
            onChange={handleChange}
            type="password"
            value={values.retypedPassword}
            errors={
              errors.retypedPassword
                ? [
                    {
                      field: "retypedPassword",
                      message: errors.retypedPassword,
                    },
                  ]
                : undefined
            }
          />
        </S.InputFields> */}

        {/* <Button testingContext="submit" type="submit" fullWidth>
          <FormattedMessage defaultMessage="SET NEW PASSWORD" />
        </Button> */}
      </form>
      <ButtonIcon
        text="Set new password"
        onClick={handleSubmit}
        bgColor="#FF6347"
      />
    </S.Wrapper>
  );
};
