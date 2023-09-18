import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  width: 350px;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
  /* width: 100%; */
  height: fit-content;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 24px;
  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  p {
  }
`;

export const Spacing = styled.div`
  width: 100%;
  height: 24px;
`;

export const GeneralError = styled.p`
  color: ${props => props.theme.colors.error} !important;
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #808080;
  margin-bottom: 24px;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10.5rem;
  margin: 1rem auto;
`;
