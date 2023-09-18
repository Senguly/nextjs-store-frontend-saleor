import { media, styled } from "@styles";

type TileProps = {
  columns: number;
};

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 24px;
`;

export const Wrapper = styled.div`
  margin: 0;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

export const GridLayout = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  grid-column-gap: 16px;
  grid-row-gap: 24px;
  @media screen and (max-width: 540px) {
    grid-template-columns: auto;
  }
  margin: 0;
`;

export const Tile = styled.div<TileProps>`
  margin: 0;
  padding: 0;
  /* padding-top: ${props => props.theme.spacing.gutter}; */
  /* padding-left: ${props => props.theme.spacing.gutter}; */
  /* width: 100%; */

  ${media.smallScreen`
    width: 100%;
  `}
`;
