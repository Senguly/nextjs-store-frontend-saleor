import "./i18n";

import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-apollo";

import { Loader } from "@components/atoms";
import { useDynamicRouteRedirect } from "@hooks";
import CartContextProvider from "@temp/contexts/CartContext";
import LanguageContextProvider from "@temp/contexts/LanguageContext";
import ServiceContextProvider from "@temp/contexts/ServiceContext";
import { getMyStore } from "@temp/views/Order/queries";
import { ShopConfig } from "@utils/ssr";

import {
  Footer,
  MainMenu,
  MetaConsumer,
  // NotFound,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";

type AppProps = ShopConfig;

const App: React.FC<AppProps> = ({ shopConfig, children }) => {
  const { pathname } = useRouter();
  const willRedirect = useDynamicRouteRedirect();
  const { tokenRefreshing, tokenVerifying } = useAuth();

  const { data, loading: storeLoadding } = useQuery(getMyStore, {
    variables: {},
    fetchPolicy: "cache-and-network",
  });

  // console.log("Myshop", data);

  const loading =
    tokenRefreshing || tokenVerifying || willRedirect || storeLoadding;

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { myStore: data });
    }
    return child;
  });

  // if (!data?.myStore.active) {
  //   return <NotFound />;
  // }

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider pathname={pathname}>
        <ServiceContextProvider>
          <LanguageContextProvider>
            <CartContextProvider>
              <MetaConsumer metaDescription={data?.myStore?.description} />
              <MainMenu logo={data?.myStore?.logo} myStore={data?.myStore} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "calc(100vh - 72px)",
                }}
              >
                {loading ? <Loader fullScreen /> : childrenWithProps}
                <Footer store={data} />
              </div>

              <OverlayManager />
              <Notifications />
            </CartContextProvider>
          </LanguageContextProvider>
        </ServiceContextProvider>
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
