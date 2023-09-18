import styled from "styled-components";

export const Wrapper = styled.table`
  // display: flex;
  // justify-content: space-between;
  // align-items: flex-start;
  margin: 0 0 16px 0;
`;

export const TR = styled.tr`
  border: none;
`;

export const Quantity = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  white-space: nowrap;
`;

export const TD = styled.td`
  padding: 0;
  vertical-align: baseline;
`;

export const ProductInfoWrap = styled.div``;

export const Name = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  padding: 0 8px;
  //   margin: 0 8px;
`;

export const AttributeList = styled.ul`
  padding: 0;
  margin: 0;
`;
export const AttributeItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  color: #808080;
  padding: 0px 0px 0px 8px;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
  width: 80px;
  white-space: nowrap;
`;
