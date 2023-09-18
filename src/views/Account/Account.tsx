import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { Redirect } from "@components/atoms";
import { AccountMenu } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@pages";
import { paths } from "@paths";

import AddressBook from "../../account/AddressBook/AddressBook";
import { Loader } from "../../components";

import "./scss/index.scss";

const returnTab: any = (path: string, userDetails) => {
  let tabContent = <></>;
  switch (path) {
    case paths.account: {
      tabContent = <AccountTab />;
      break;
    }
    case paths.accountAddressBook: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case paths.accountOrderHistory: {
      tabContent = <OrdersHistory />;
      break;
    }
    default:
      tabContent = <AccountTab />;
      break;
  }
  return tabContent;
};

const Wrapper = styled.div`
  /* min-height: 90vh; */
  margin-top: 24px !important;
`;

export const AccountView: NextPage = () => {
  // const intl = useIntl();
  const { user, loaded } = useAuth();
  const { pathname } = useRouter();
  const links = [
    paths.account,
    paths.accountOrderHistory,
    paths.accountAddressBook,
  ];

  if (!user) {
    return <Redirect url={paths.home} />;
  }
  return loaded ? (
    <Wrapper className="container">
      <div className="account">
        {/* <Media minWidth={smallScreen}>
         
        </Media> */}
        <div className="account__menu">
          <AccountMenu links={links} active={pathname} />
        </div>
        {/* <Media maxWidth={smallScreen - 1}>
          <div className="account__menu_mobile">
            <AccountMenuMobile links={links} active={pathname} />
          </div>
        </Media> */}
        <div className="account__content">
          {user && returnTab(pathname, user)}
        </div>
      </div>
    </Wrapper>
  ) : (
    <Loader />
  );
};
