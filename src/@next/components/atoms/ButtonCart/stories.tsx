import { storiesOf } from "@storybook/react";
import React from "react";

import cart from "../../../../images/cart.svg";
import ButtonCard from ".";

storiesOf("@components/atoms/ButtonCard", module)
  .addParameters({ component: ButtonCard })
  .add("default", () => (
    <ButtonCard
      color="#D63384"
      icon={cart}
      text="View Order"
      price="€ 294,50"
    />
  ));
