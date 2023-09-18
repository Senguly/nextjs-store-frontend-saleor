import { storiesOf } from "@storybook/react";
import React from "react";

import ListProduct from ".";

const DEFAULT_PROPS = {
  listCategory: [],
};

storiesOf("@components/atoms/ListProduct", module)
  .addParameters({ component: ListProduct })
  .add("default", () => <ListProduct {...DEFAULT_PROPS} />);
