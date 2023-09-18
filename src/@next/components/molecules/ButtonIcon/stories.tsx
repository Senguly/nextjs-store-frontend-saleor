import { storiesOf } from "@storybook/react";
import React from "react";

import ButtonIcon from ".";

import Delivery from "images/Delivery.svg";

const DEFAULT_PROPS = {
  icon: Delivery,
  text: "Delivery",
};

storiesOf("@components/molecules/ButtonIcon", module)
  .addParameters({ component: ButtonIcon })
  .add("default", () => <ButtonIcon {...DEFAULT_PROPS} />);
