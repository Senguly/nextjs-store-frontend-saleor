/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from "@storybook/react";

import AddNewAddress from ".";

const DEFAULT_PROPS = {
  title: "Add new address",
  isActive: true,
};

storiesOf("@components/atoms/AddNewAddress", module)
  .addParameters({ component: AddNewAddress })
  .add("default", () => <AddNewAddress {...DEFAULT_PROPS} />);
