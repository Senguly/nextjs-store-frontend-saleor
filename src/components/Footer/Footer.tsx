import * as React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

import bird from "../../images/orderich-logo.svg";

import "./scss/index.scss";

interface IProps {
  store?: any;
}

const Footer = ({ store }: IProps) => {
  const { name } = store?.myStore || {};
  return (
    <div className="footer">
      <div className="container">
        <FooterWrap>
          <Col1>
            <ReactSVG path={bird} />
          </Col1>
          <Col2>
            <FooterContent>
              {name}, powered by{" "}
              <LinkCustom
                target="_blank"
                // href="https://orderich.com/"
                href={`https://orderich.com?utm_source=store-footer&utm_medium=web&utm_campaign=${
                  store?.myStore?.domain?.split(".")[0]
                }`}
              >
                Orderich
              </LinkCustom>
            </FooterContent>
          </Col2>
          <Col3>
            <LinkCustom
              style={{ fontSize: "14px", marginRight: "16px" }}
              href=""
            >
              Terms & conditions
            </LinkCustom>

            <LinkCustom style={{ fontSize: "14px" }} href="">
              Privacy policy
            </LinkCustom>
          </Col3>
        </FooterWrap>
      </div>
    </div>
  );
};

const FooterWrap = styled.div`
  padding: 48px 0;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-bottom: 88px;
    padding: 24px 0;
  }
`;

const FooterContent = styled.p`
  font-size: 16px;
`;

const LinkCustom = styled.a`
  color: #0f6aff !important;
`;

const Col1 = styled.div`
  display: flex;
`;

const Col2 = styled.div`
  margin: 16px 0 8px 0;
`;

const Col3 = styled.div``;

export default Footer;
