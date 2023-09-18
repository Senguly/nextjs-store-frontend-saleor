/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from "@storybook/react";

import CheckoutProgress from ".";

const DEFAULT_PROPS = {
  title: "Order status",
};

storiesOf("@component/atoms/CheckoutProgress", module)
  .addParameters({
    component: CheckoutProgress,
  })
  .add("default", () => <CheckoutProgress {...DEFAULT_PROPS} />);
