import { storiesOf } from "@storybook/react";
import React from "react";

import QuantityField from ".";

const DEFAULT_PROPS = {
  value: 1,
  isDialog: true,
};

storiesOf("@components/molecules/QuantityField", module)
  .addParameters({ component: QuantityField })
  .add("default", () => <QuantityField {...DEFAULT_PROPS} />);
