import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";
import ReactSVG from "react-svg";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

import Bag from "images/Bag.svg";
import Location from "images/Location.svg";
import User from "images/user.svg";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  const intl = useIntl();
  const switchIcon = (value: string) => {
    if (value === "My account") return User;
    if (value === "Orders") return Bag;
    if (value === "Addresses") return Location;
  };
  return (
    <S.Wrapper>
      {/* <S.MenuHeader>
        <FormattedMessage {...commonMessages.myAccount} />
      </S.MenuHeader> */}
      {links.map(link => {
        const text = {
          [paths.account]: intl.formatMessage(commonMessages.myAccount),
          [paths.accountOrderHistory]: intl.formatMessage(
            commonMessages.orderHistory
          ),
          [paths.accountAddressBook]: intl.formatMessage(
            commonMessages.addressBook
          ),
        }[link];

        return (
          <Link
            href={link}
            key={link}
            data-test="accountMenuLink"
            data-test-id={link}
          >
            <S.ItemWrap active={active === link}>
              <S.IconBox>
                <ReactSVG path={switchIcon(text)} />
              </S.IconBox>
              <S.MenuItem active={active === link}>{text}</S.MenuItem>
            </S.ItemWrap>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
