import React from "react";
import { useTranslation } from "react-i18next";
import ReactSVG from "react-svg";

import * as S from "./styles";

import x from "images/x.svg";

interface IProps {
  title?: string;
  isOpen?: any;
  data?: any;
}

function ServiceTimeDialog({ title, isOpen, data }: IProps) {
  const { t } = useTranslation();
  const today = new Date().getDay();

  return (
    <S.Wrapper>
      <S.Head>
        <S.Name>{title}</S.Name>
        <S.IconBox onClick={() => isOpen(false)}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <S.Table>
          <S.Tr>
            <S.Th>{t("day")}</S.Th>
            <S.Th>{t("delivery ")}</S.Th>
            <S.Th>{t("pickup ")}</S.Th>
          </S.Tr>
          {data.map((item: any, index: number) => {
            return (
              <S.Tr key={index} isActive={today === index + 1}>
                <S.Td>{t(`${item.day} `)}</S.Td>
                <S.Td>
                  {item.dl.length === 0 ? (
                    <p>{t("Closed ")}</p>
                  ) : (
                    item.dl.map((open: any) => {
                      return <p>{`${open?.open} - ${open?.close}`}</p>;
                    })
                  )}
                </S.Td>
                <S.Td>
                  {" "}
                  {item.pu.length === 0 ? (
                    <p>{t("Closed ")}</p>
                  ) : (
                    item.pu.map((open: any) => {
                      return <p>{`${open.open} - ${open.close}`}</p>;
                    })
                  )}
                </S.Td>
              </S.Tr>
            );
          })}
        </S.Table>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default ServiceTimeDialog;
