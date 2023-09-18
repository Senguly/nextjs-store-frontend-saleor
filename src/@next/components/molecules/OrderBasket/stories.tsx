import { storiesOf } from "@storybook/react";
import React from "react";

import OrderBasket from ".";

storiesOf("@components/molecules/OrderBasket", module)
  .addParameters({ component: OrderBasket })
  .add("default", () => <OrderBasket />);
