import { styled } from "@styles";

export const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 24px;
`;

export const Name = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export const TextInfo = styled.p`
  display: block;
  /* margin-bottom: 8px; */
  font-size: 16px;
  font-weight: 400px;
  line-height: 24px;
  color: #808080;
`;

export const ButtonWrap = styled.div`
  /* display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 16px; */

  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const Button = styled.div`
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 8px 24px;
  cursor: pointer;
  width: fix-content;
`;

export const Text = styled.p<{ color?: string }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${props => props.color || "#808080"};
  text-align: center;
`;
