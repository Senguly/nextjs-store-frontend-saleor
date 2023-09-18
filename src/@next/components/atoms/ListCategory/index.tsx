/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable import/namespace */
import React from "react";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import { animateScroll as scroll } from "react-scroll";

// import Scrollspy from "react-scrollspy";
import SelectMore from "./Components/More";
import * as S from "./styles";

interface IProps {
  ListCategory: any;
  scrollPos?: number;
}
// const pos = 0;
let triggerCheck = false;

function ListCategory(props: IProps) {
  const { ListCategory } = props;

  const checkEnableCategory = (category: any) => {
    let result = false;
    if (category?.node?.enable && category?.node?.products?.edges?.length) {
      result = category?.node?.products?.edges?.some((item: any) => {
        return item?.node?.enable === true;
      });
    }
    return result;
  };

  const data = ListCategory.filter((item: any) =>
    checkEnableCategory(item)
  ).map((item: any) => {
    return { ...item, isActive: false };
  });
  // const [list, setlist] = React.useState(data);

  const prevScrollY = React.useRef(0);
  const [goingUp, setGoingUp] = React.useState(false);
  const [checkMore, setCheckMore] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY: any = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
      const a =
        data && data.length > 5 && document.getElementById(data[6]?.node.id);
      if (a && a.offsetTop - 58 <= currentScrollY) {
        triggerCheck = true;
      } else {
        triggerCheck = false;
      }
      setCheckMore(triggerCheck);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const onScrollToElement = (id: any, isMore?: boolean, goingUp?: boolean) => {
    const ele = document.getElementById(id)?.offsetTop;
    const eleClass = document.getElementsByClassName("test");
    if (ele) {
      if (eleClass.length > 0) {
        // if (!goingUp) {
        //   scroll.scrollTo(ele - 120, { duration: 0 });
        // } else {
        // }
        scroll.scrollTo(ele - 58, { duration: 600 });
      }
    }
    if (isMore) {
      for (let i = 0; i < eleClass.length; i++) {
        if (eleClass) {
          eleClass[i].classList.remove("active");
        }
      }
    }
  };

  const { t } = useTranslation();

  return (
    <S.Wrapper isGoingUp={goingUp}>
      <Media
        query={{
          maxWidth: 768,
        }}
      >
        {(matches: boolean) => {
          if (matches) {
            return (
              <S.ScrollspyCustomize
                className="nav__inner isMobile scroll-horizon"
                items={data.map((item: any) => item.node.id)}
                currentClassName="active"
                offset={-59}
                onUpdate={el => {
                  if (el) {
                    document
                      ?.getElementsByClassName("scroll-horizon")[0]
                      .scrollTo(
                        document.getElementById(`h-${el.id}`)?.offsetLeft || 0,
                        0
                      );
                  }
                  // console.log("asdasd", el.id);

                  // el.scrollIntoView();
                }}
              >
                {data.map((item: any, index: number) => {
                  return (
                    <S.Item
                      id={`h-${item.node.id}`}
                      key={index}
                      className={`test ${item.node.id} `}
                      // eslint-disable-next-line no-return-assign
                    >
                      <p
                        id={`nav-${item.node.id}`}
                        // className={`test ${item.node.id}`}
                        onClick={() => {
                          onScrollToElement(item.node.id);
                        }}
                      >
                        {item.node.name}
                      </p>
                      {/* <a className="test1">{item.node.name}</a> */}
                    </S.Item>
                  );
                })}
              </S.ScrollspyCustomize>
            );
          }
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <S.ScrollspyCustomize
                items={data.slice(0, 6).map((item: any) => item.node.id)}
                currentClassName="active"
                className="nav__inner"
                offset={-59}
              >
                {data.map((item: any, index: number) => {
                  if (index <= 5) {
                    return (
                      <S.Item key={index} className={`test ${item.node.id}`}>
                        <p
                          id={`nav-${item.node.id}`}
                          // className={`test ${item.node.id}`}
                          onClick={() => {
                            onScrollToElement(item.node.id, false, goingUp);
                          }}
                        >
                          {item.node.name}
                        </p>
                      </S.Item>
                    );
                  }
                })}
              </S.ScrollspyCustomize>

              {data.length > 6 && (
                <SelectMore
                  title={t("more ")}
                  options={data.slice(6)}
                  onClick={(id: any) => {
                    onScrollToElement(id, true, goingUp);
                  }}
                  checkMore={checkMore}
                />
              )}
            </div>
          );
        }}
      </Media>
    </S.Wrapper>
  );
}

export default ListCategory;
