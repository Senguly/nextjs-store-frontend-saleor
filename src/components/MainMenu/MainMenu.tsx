import { useAuth } from "@saleor/sdk";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import Modal from "react-modal";

import ForgotPasswordDialog from "@components/molecules/ForgotPasswordDialog";
import LoginDialog from "@components/molecules/LoginDialog";
import RegisterDialog from "@components/molecules/RegisterDialog";
import SuccessDialog from "@components/molecules/SuccessDialog";
import { smallScreen } from "@styles/constants";
import { LanguageContext } from "@temp/contexts/LanguageContext";

import CustomizeButton from "../CustomizeButton";
import CustomizeSelect from "../CustomizeSelectBox";
import * as S from "./styles";

import EmailStroke from "images/EmailStroke.svg";
import User from "images/user.svg";
import VectorStroke from "images/VectorStroke.svg";

import "./scss/index.scss";

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

interface MainMenuProps {
  logo?: any;
  myStore?: any;
}
const Items = [
  { key: "Nederlands", value: "nederlands", code: "hl" },
  { key: "English", value: "english", code: "en" },
];

const routeUser = [
  {
    key: "My account",
    value: "account",
    code: "hl",
  },
  {
    key: "Orders",
    value: "history",
    code: "en",
  },
  {
    key: "Addresses",
    value: "address",
    code: "hl",
  },
  {
    key: "Log out",
    value: "logout",
    code: "en",
  },
];
export const MainMenu: React.FC<MainMenuProps> = ({ logo, myStore }) => {
  const [title, setTitle] = React.useState({
    key: "English",
    value: "english",
    code: "en",
  });

  const [isOpenLogin, setIsOpenLogin] = React.useState(false);
  const [isOpenRegister, setIsOpenRegister] = React.useState(false);
  const [isOpenRegisterSuccess, setIsOpenRegisterSuccess] = React.useState(
    false
  );

  const [isOpenResetPassword, setIsOpenResetPassword] = React.useState(false);
  const [isOpenResetSuccess, setIsOpenResetSuccess] = React.useState(false);

  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const changeLng = lng => {
    i18n.changeLanguage(lng);
  };

  const { i18n } = useTranslation();
  const router = useRouter();
  const { push, query } = router;
  const { changeLanguage } = useContext(LanguageContext);

  React.useEffect(() => {
    changeLanguage(title);
    changeLng(title.code);
  }, [title]);

  const prevScrollY = React.useRef(0);
  const [goingUp, setGoingUp] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY: any = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const onRequestClose = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    setIsOpenRegisterSuccess(false);
    setIsOpenResetPassword(false);
    setIsOpenResetSuccess(false);
  };
  const handleClick = () => {
    const { qr } = query;
    if (qr) {
      push(`/?qr=${qr}`);
    } else {
      push("/");
    }
  };

  const switchAction = (item: any) => {
    switch (item.value) {
      case "account":
        push("/account");
        break;
      case "history":
        push("/account/order-history/");
        break;
      case "logout":
        handleSignOut();
        break;
      case "address":
        push("/account/address-book/");
        break;
      default:
        push("/account");
    }
  };

  return (
    <S.Container isGoingUp={goingUp}>
      <Head>
        <title> Ordering from {myStore?.name}</title>
        <link rel="icon" type="image/png" href={myStore?.favicon?.url} />
      </Head>

      <div className="container">
        <S.Wrapper isGoingUp={goingUp}>
          <Media
            query={{
              maxWidth: smallScreen,
            }}
          >
            {matches => {
              return (
                <>
                  <S.ImgBox onClick={handleClick}>
                    <S.Image src={logo?.url} alt="" />
                  </S.ImgBox>

                  <S.ButtonWrap>
                    <CustomizeSelect
                      title={title.key}
                      onClick={(item: any) => setTitle(item)}
                      options={Items}
                      style={{ marginRight: "16px" }}
                      isLanguage
                    />
                    {!user &&
                      (matches ? (
                        <CustomizeButton
                          isUser
                          iconUrl={User}
                          onClick={() =>
                            user ? handleSignOut() : setIsOpenLogin(true)
                          }
                        />
                      ) : (
                        <CustomizeButton
                          iconUrl={User}
                          title={user ? "Log out" : "Log in"}
                          onClick={() =>
                            user ? handleSignOut() : setIsOpenLogin(true)
                          }
                        />
                      ))}
                    {user &&
                      (matches ? (
                        <CustomizeSelect
                          iconUrl={User}
                          onClick={(item: any) => switchAction(item)}
                          options={routeUser}
                          style={{ padding: "12px 24px" }}
                        />
                      ) : (
                        <CustomizeSelect
                          iconUrl={User}
                          title={
                            user
                              ? user?.firstName?.trim().length > 0
                                ? user.firstName
                                : "Account"
                              : "Log in"
                          }
                          onClick={(item: any) => {
                            switchAction(item);

                            // user ? handleSignOut() : setIsOpenLogin(true);
                            // switch (item.value) {
                            //   case "":
                            // }
                          }}
                          options={routeUser}
                        />
                      ))}
                  </S.ButtonWrap>
                </>
              );
            }}
          </Media>
        </S.Wrapper>
      </div>
      <Media
        query={{
          maxWidth: 717,
        }}
      >
        {matches => {
          const style = matches ? customMobileStyles : customStyles;

          return (
            <>
              <Modal
                isOpen={isOpenLogin}
                onRequestClose={onRequestClose}
                style={style}
              >
                <LoginDialog
                  hide={onRequestClose}
                  setIsOpenRegister={setIsOpenRegister}
                  setIsOpenResetPassword={setIsOpenResetPassword}
                />
              </Modal>
              <Modal
                isOpen={isOpenRegister}
                onRequestClose={onRequestClose}
                style={style}
              >
                <RegisterDialog
                  hide={onRequestClose}
                  setIsOpenLogin={setIsOpenLogin}
                  setIsOpenRegisterSuccess={setIsOpenRegisterSuccess}
                  channelSlug={myStore?.myStore?.channel?.slug}
                />
              </Modal>

              <Modal
                isOpen={isOpenRegisterSuccess}
                onRequestClose={onRequestClose}
                style={style}
              >
                <SuccessDialog
                  hide={onRequestClose}
                  setIsOpenLogin={setIsOpenLogin}
                  title="Your account is ready"
                  text="Your orders and addresses will now be saved for your convenience."
                  icon={VectorStroke}
                />
              </Modal>

              <Modal
                isOpen={isOpenResetPassword}
                onRequestClose={onRequestClose}
                style={style}
              >
                <ForgotPasswordDialog
                  hide={onRequestClose}
                  setIsOpenResetSuccess={setIsOpenResetSuccess}
                  channelSlug={myStore?.myStore?.channel?.slug}
                />
              </Modal>

              <Modal
                isOpen={isOpenResetSuccess}
                onRequestClose={onRequestClose}
                style={style}
              >
                <SuccessDialog
                  hide={onRequestClose}
                  setIsOpenLogin={setIsOpenLogin}
                  title="Check your inbox"
                  text="An email was sent to you. Click on the link in the email to continue."
                  icon={EmailStroke}
                />
              </Modal>
            </>
          );
        }}
      </Media>
    </S.Container>
  );
};

export default MainMenu;
