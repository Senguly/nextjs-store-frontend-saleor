/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Scrollspy from "react-scrollspy";
import ReactSVG from "react-svg";
import styled from "styled-components";

import Down from "../../../../../../images/down.svg";

function SelectMore({ title, options, onClick, checkMore }: any) {
  const [open, setOpen] = React.useState(false);
  // console.log(prevScrollY.current, "---------------prevScrollY");
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpen(false);
      }}
    >
      <Wrapper
        onClick={() => {
          setOpen(!open);
        }}
        active={open || checkMore}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title active={open || checkMore}>{title}</Title>
          <Icon path={Down} active={open || checkMore} />

          <ScrollspyCustomize
            items={options.map((item: any) => item.node.id)}
            currentClassName={checkMore ? "active_more" : ""}
            scrolledPastClassName="active_past"
            className={`${open && "open"}`}
            onUpdate={el => {}}
            // offset={-113}
          >
            {(options || []).map((item: any, index: number) => {
              return (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    onClick(item?.node?.id);
                  }}
                >
                  <p
                    id={`nav-${item.node.id}`}
                    style={{ padding: 0 }}
                    className={`test ${item.node.id}`}
                    onClick={() => {
                      onClick(item?.node.id);
                    }}
                  >
                    {item.node.name}
                  </p>
                </DropdownItem>
              );
            })}
          </ScrollspyCustomize>
        </div>
      </Wrapper>
    </OutsideClickHandler>
  );
}

const Wrapper = styled.div<{ active?: any }>`
  display: flex;
  justify-content: space-around;
  align-items: start;
  // border-radius: 8px;
  cursor: pointer;
  color: #808080;
  transition: 0.3s;
  &:hover {
    // color: #ff6347;
  }
  position: relative;
  padding: 0 0 0 0;
  height: 100%;
  ${props =>
    props.active &&
    "border-bottom: 2px solid #ff6347;margin-bottom: -2px; color:#ff6347 "}
`;
const Icon = styled(ReactSVG)<{ active?: any }>`
  svg * {
    fill: ${props => props.active && "#ff6347"};
  }
`;

// const DropdownList = styled.ul`
//   position: absolute;
//   z-index: 1000;
//   top: 120%;
//   min-width: 255px;
//   border: 1px solid #dcdcdc;
//   border-radius: 8px;
//   background: #fff;
//   right: 0;
//   margin: 0;
//   padding: 16px;
//   display: grid;
//   grid-row-gap: 8px;
// `;
const DropdownItem = styled.li`
  padding: 8px 0;
  text-align: center;
  border-radius: 8px;
  p {
    color: #808080;
  }
  &:hover {
    background: #f5f5f5;
    color: #ff6347;
  }
  &.active_more {
    background: #f5f5f5;
    p {
      color: #ff6347;
    }
  }
`;

const Title = styled.p<{ active: boolean }>`
  margin: 0;
  fontsize: 16px;
  margin-right: 8px;
  color: ${props => (props.active ? "#ff6347" : "#808080")};
`;
const ScrollspyCustomize = styled(Scrollspy)`
  position: absolute;
  z-index: 1000;
  min-width: 255px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fff;
  right: 0;
  margin: 0;
  padding: 16px;
  display: none;
  grid-row-gap: 8px;
  // top: -9000px;
  &.open {
    display: grid;
    top: 120%;
    max-height: 80vh;
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export default SelectMore;
