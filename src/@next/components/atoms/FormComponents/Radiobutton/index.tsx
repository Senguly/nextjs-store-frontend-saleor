/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/require-default-props */
import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

interface IProps {
  id?: any;
  options: any;
  title?: string;
  subTitle?: string;
  onChange: any;
  defaultValue?: any;
  bigOptions?: any;
  flag?: boolean;
  isError?: boolean;
  setOptions?: React.Dispatch<
    React.SetStateAction<{
      single: never[];
      multiple: never[];
    }>
  >;
  // myStore?: any;
}

function RadioButtonContainer({
  id,
  options,
  title,
  subTitle,
  onChange,
  defaultValue,
  setOptions,
  bigOptions,
  flag,
  isError,
}: // myStore,
IProps) {
  // const positionPay: any[] = [];

  // Object.keys(myStore || {}).forEach(key => {
  //   if (key === "indexCash" || key === "indexStripe") {
  //     positionPay[myStore[key]] = options.filter(
  //       (element: { text: string }) => {
  //         const checkKey = key.slice(5) === "Stripe" ? "Ideal" : key.slice(5);
  //         return element.text === checkKey;
  //       }
  //     )?.[0];
  //   }
  // });

  const temp = options.map((item: any, index: number) => {
    if (defaultValue) {
      if (item.value === defaultValue) {
        return { ...item, stt: true };
      }
      if (index === 0) {
        return { ...item, stt: true };
      }
      return { ...item, stt: false };
    }

    return { ...item, stt: false };
  });

  const [listOption, setListOption] = React.useState(temp);

  const onHandlechange = (e: any, index: number, item: any) => {
    const listTemp = temp.map((item: any) => ({ ...item, stt: false }));

    listTemp[index].stt = true;
    setListOption(listTemp);
    onChange(e, listTemp);
  };

  React.useEffect(() => {
    if (setOptions) {
      const clone = { ...bigOptions };
      const listOps = listOption.filter((item: any) => item.stt);
      listOps.forEach((e?: any) => {
        if (clone?.single.findIndex((i: any) => i.value === e.value) === -1) {
          clone?.single.push(e);
        }
      });
      setOptions({ ...clone });
    }
  }, []);

  return (
    <Wrapper id={id}>
      <Title>
        {title}{" "}
        {subTitle && <SubTitle isError={isError}>({subTitle})</SubTitle>}
      </Title>
      {listOption.map((item: any, index: number) => {
        const radRef = React.createRef<HTMLInputElement>();

        return (
          <ItemWrap
            key={index}
            isChecked={item.stt}
            onClick={() => {
              radRef.current?.click();
            }}
          >
            <div style={{ display: "flex" }}>
              <RadioButton
                type="radio"
                id={`${item.value}`}
                name="radio-group"
                ref={radRef}
                value={item.value}
                checked={item.stt}
                onChange={e => onHandlechange(e, index, item)}
              />
              <Text>{item.text === "Ideal" ? "iDEAL" : item.text}</Text>
              {item.subIcon && (
                <WrapperSvg>
                  <ReactSVG path={item.subIcon} />
                </WrapperSvg>
              )}
            </div>
            {item ? (
              <Price stt={item.stt}>
                {flag && item.price === 0
                  ? ""
                  : item.price &&
                    `+  ${item.currency} ${item.price
                      .toFixed(2)
                      .replace(".", ",")}`}
              </Price>
            ) : null}
          </ItemWrap>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.form``;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

const SubTitle = styled.span<{ isError?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${props => (props.isError ? "#DC3545" : "#808080")};
`;

const ItemWrap = styled.div<{ isChecked?: boolean }>`
  border: 1px solid ${props => (props.isChecked ? "#ff6347" : "#dcdcdc")};
  padding: 7px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const WrapperSvg = styled.div`
  svg {
    display: flex;
    margin: auto;
  }

  display: flex;
  margin: auto;
`;

const RadioButton = styled.input`
  &:checked,
  :not(:checked) {
    position: absolute;
    left: -10000px;
  }

  &:checked + label,
  :not(:checked) + label {
    position: relative;
    padding-left: 24px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #000;
  }

  &:checked + label:before,
  :not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0%;
    top: 10%;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }

  &:checked + label {
    color: #ff6347;
  }
  &:checked + label:before {
    background: #ff6347;
  }

  &:checked + label:after,
  :not(:checked) + label:after {
    content: "";
    width: 8px;
    height: 8px;
    background: #fff;
    position: absolute;
    top: 6px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
`;

const Text = styled.label`
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  margin-right: 13px;
`;

const Price = styled.p<{ stt?: boolean }>`
  color: ${props => props.stt && "#ff6347"};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

export default RadioButtonContainer;
