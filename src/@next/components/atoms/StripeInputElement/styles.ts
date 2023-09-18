import { DefaultTheme, styled } from "@styles";

type WrapperProps = {
  active: boolean;
  error: boolean;
  theme: DefaultTheme;
};

const getEdgeColor = (
  { active, error, theme }: WrapperProps,
  hovered = false
) => {
  if (error) {
    return theme.colors.error;
  }

  if (hovered) {
    return theme.colors.secondary;
  }

  return active ? theme.colors.secondary : theme.colors.dark;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  color: ${props => getEdgeColor(props)};
  outline: none;
  transition: all 0.3s ease;
  font-size: 12px!important;
  font-weight: 400!important;

  &:hover {
    color: ${props => getEdgeColor(props, true)};
    // outline-width: 1px;
    // outline-style: solid;
    // border-color: ${props => getEdgeColor(props, true)};
    // outline-color: ${props => getEdgeColor(props, true)};
    border: 1px solid #ff6347;
    outline: none;
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
