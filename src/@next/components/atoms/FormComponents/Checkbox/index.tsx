/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import React from "react";
import styled from "styled-components";

interface IProps {
  id: any;
  options: any;
  title: string;
  subTitle?: string;
  onChange: any;
  bigOptions?: any;
  flag?: boolean;
  isError?: boolean;
  setOptions?: React.Dispatch<
    React.SetStateAction<{
      single: never[];
      multiple: never[];
    }>
  >;
}

function CheckboxContainer({
  id,
  options,
  title,
  subTitle,
  onChange,
  bigOptions,
  flag,
  isError,
  setOptions,
}: IProps) {
  const temp = options.map((item: any, index: number) => {
    return { ...item, stt: false };
  });

  const [listOption, setListOption] = React.useState(temp);

  const onHandlechange = (e: any, index: number, item: any) => {
    const listTemp = [...listOption];

    listTemp[index].stt = !listTemp[index].stt;

    setListOption(listTemp);
    onChange(e, listTemp, index);
  };

  const isDisabled = (maxOptions: number, id: string, stt: boolean) => {
    const listOptionSelected = bigOptions.multiple.filter(
      (item: { optionId: string }) => item.optionId === id
    );

    return (
      listOptionSelected.length + 1 > maxOptions &&
      stt === false &&
      listOptionSelected.some((item: any) => item.optionId === id)
    );
  };

  React.useEffect(() => {
    if (setOptions) {
      const clone = { ...bigOptions };
      const listOps = listOption.filter((item: any) => item.stt);

      listOps.forEach((e?: any) => {
        if (clone?.multiple.findIndex((i: any) => i.value === e.value) === -1) {
          clone?.multiple.push(e);
        }
      });

      setOptions({ ...clone });
    }
  }, []);

  return (
    <Wrapper id={id}>
      <Title>
        {title} {subTitle && <SubTitle isError={isError}>{subTitle}</SubTitle>}
      </Title>
      {listOption.map((item: any, index: number) => {
        const radRef = React.createRef<HTMLInputElement>();
        return (
          <ItemWrap
            isChecked={item.stt}
            onClick={() => {
              radRef.current?.click();
            }}
          >
            <div>
              <Checkbox
                type="checkbox"
                id={`${item.value}`}
                name="checkbox"
                value={item.value}
                checked={item.stt}
                disabled={isDisabled(item.maxOptions, id, item.stt)}
                onChange={e => onHandlechange(e, index, item)}
                ref={radRef}
              />
              <Text
                htmlFor={`${item.value}`}
                onClick={() => {
                  radRef.current?.click();
                }}
              >
                {item.text}
              </Text>
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

const Wrapper = styled.div``;

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
  box-sizing: border-box;
`;

const Checkbox = styled.input`
  display: none;
  &:checked + label:before {
    background-color: #ff6347;
  }

  &:checked + label:after {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    left: 7px;
    width: 4px;
    height: 9px;
    border: solid #fff;
    border-width: 0 1px 1px 0;

    transform: rotate(45deg);
  }

  &:checked + label {
    color: #ff6347;
  }
`;

const Text = styled.label`
  font-size: 16px;
  font-weight: 400;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    -webkit-appearance: none;
    background-color: transparent;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    padding: 8px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
  }
`;

const Price = styled.p<{ stt?: boolean }>`
  color: ${props => props.stt && "#ff6347"};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

export default CheckboxContainer;
