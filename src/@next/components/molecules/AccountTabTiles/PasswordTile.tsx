import { usePasswordChange } from "@saleor/sdk";
import React from "react";
import { useAlert } from "react-alert";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import Modal from "react-modal";

import CustomizeButton from "@temp/components/CustomizeButton";

import EditPasswordDialog from "../EditAccountDialog/EditPasswordDialog";
import * as S from "./styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
    maxHeight: "900px",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};

const customMobileStyles = {
  content: {
    top: "auto",
    left: "0",
    right: "auto",
    bottom: "0",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
    maxHeight: "100vh",
    width: "100%",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};

const showAlert = (error: any, alert: any) => {
  alert.show(
    {
      title: error && error!.extraInfo!.userInputErrors[0].message,
    },
    { type: "error", timeout: 5000 }
  );
};

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();
  // const intl = useIntl();
  const alert = useAlert();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    } else if (error) {
      onRequestClose();
      showAlert(error, alert);
    }
  }, [data, error]);

  const onRequestClose = () => {
    setIsEditing(false);
  };

  return (
    <Media
      query={{
        maxWidth: 717,
      }}
    >
      {(matches: boolean) => {
        const style = matches ? customMobileStyles : customStyles;
        return (
          <S.TileWrapper>
            {/* <Tile> */}
            <S.Wrapper>
              <S.Header>
                <FormattedMessage defaultMessage="My password" />
              </S.Header>
              <S.Spacer />
              <S.ContentEditOneLine>
                <S.ContentEdit>
                  <CustomizeButton
                    title="Change password"
                    fullWidth={false}
                    onClick={() => setIsEditing(isEditing => !isEditing)}
                  />
                </S.ContentEdit>
              </S.ContentEditOneLine>
            </S.Wrapper>
            {/* </Tile> */}

            <Modal
              isOpen={isEditing}
              onRequestClose={onRequestClose}
              style={style}
            >
              <EditPasswordDialog
                hide={onRequestClose}
                title="Edit account information"
                setPasswordChange={setPasswordChange}
                text="Please enter your current and new passwords."
                initialValue={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                // icon={EmailStroke}
              />
            </Modal>
          </S.TileWrapper>
        );
      }}
    </Media>
  );
};
