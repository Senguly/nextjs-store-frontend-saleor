import { useAccountUpdate, useAuth } from "@saleor/sdk";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import Modal from "react-modal";
import CustomizeButton from "src/components/CustomizeButton";

import { Attribute } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import EditAccountDialog from "../EditAccountDialog/EditAccountDialog";
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

export const AccountTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const intl = useIntl();
  const { user } = useAuth();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
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
            {/* <Tile></Tile> */}
            <S.Wrapper>
              <S.Header>
                <FormattedMessage defaultMessage="My account information" />
              </S.Header>
              <S.Content>
                <>
                  <S.ContentOneLine>
                    <Attribute
                      description={intl.formatMessage(commonMessages.email)}
                      attributeValue={(user && user.email) || "-"}
                      testingContext="emailText"
                    />
                  </S.ContentOneLine>
                  <S.Spacer />
                  <S.ContentAttribute data-test="personalDetailsSection">
                    <S.ContentOneLineItem>
                      <Attribute
                        description={intl.formatMessage(
                          commonMessages.firstName
                        )}
                        attributeValue={(user && user.firstName) || "-"}
                        testingContext="firstNameText"
                      />
                    </S.ContentOneLineItem>
                    <S.ContentOneLineItem>
                      <Attribute
                        description={intl.formatMessage(
                          commonMessages.lastName
                        )}
                        attributeValue={(user && user.lastName) || "-"}
                        testingContext="lastNameText"
                      />
                    </S.ContentOneLineItem>
                  </S.ContentAttribute>
                </>
              </S.Content>
              <S.ContentEditOneLine>
                <S.ContentEdit>
                  <CustomizeButton
                    title="Edit account information"
                    fullWidth={false}
                    onClick={() => setIsEditing(isEditing => !isEditing)}
                  />
                </S.ContentEdit>
              </S.ContentEditOneLine>
            </S.Wrapper>

            {/* modal here */}
            <Modal
              isOpen={isEditing}
              onRequestClose={onRequestClose}
              style={style}
            >
              <EditAccountDialog
                hide={onRequestClose}
                title="Edit account information"
                setAccountUpdate={setAccountUpdate}
                initialValue={{
                  email: user?.email,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                }}
              />
            </Modal>
          </S.TileWrapper>
        );
      }}
    </Media>
  );
};
