import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import ReactSVG from "react-svg";
import styled from "styled-components";

function CustomizeSelect({
  title,
  options,
  onClick,
  iconUrl,
  style = {},
  isLanguage = false,
}: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpen(false);
      }}
    >
      <Wrapper onClick={() => setOpen(!open)} style={style}>
        {iconUrl && (
          <IconBox className="btn-responsive">
            <ReactSVG path={iconUrl} />
          </IconBox>
        )}
        {title && <Title className="iconTitle">{title}</Title>}
        {open && (
          <DropdownList>
            {(options || []).map((item, index) => {
              return (
                <DropdownItem
                  isLanguage={isLanguage}
                  key={index}
                  onClick={() => onClick(item)}
                >
                  {item.key}
                </DropdownItem>
              );
            })}
          </DropdownList>
        )}
      </Wrapper>
    </OutsideClickHandler>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 24px;
  color: #808080 !important;
  transition: 0.3s;
  &:hover {
    border: 1px solid #ff6347;
    box-shadow: 3px 3px 0px #e5e5e5;
    p {
      color: #ff6347 !important;
    }
    svg * {
      fill: #ff6347;
    }
  }
  /* margin-left: 16px; */
  position: relative;
`;

const IconBox = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  div {
    div {
      display: flex;
      align-items: center;
    }
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  z-index: 1000;
  top: 120%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fff;
  right: 0;
  margin: 0;
  padding: 16px;
  display: grid;
  grid-row-gap: 8px;
`;

const DropdownItem = styled.li<{ isLanguage?: boolean }>`
  width: 100%;
  padding: ${props => (props.isLanguage ? "8px 24px" : "8px 77px")};
  text-align: center;
  border-radius: 8px;
  color: #808080 !important;
  white-space: nowrap;
  /* margin: 5px; */
  &:hover {
    background: #f5f5f5;
    color: #ff6347 !important;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  &.iconTitle {
    color: #808080;
  }
`;

export default CustomizeSelect;
