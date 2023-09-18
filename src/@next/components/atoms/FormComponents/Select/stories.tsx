import { storiesOf } from "@storybook/react";
import React from "react";

import SelectCustomize from ".";

const DEFAULT_PROPS = {
  title: "First name",
  errors: "looix",
  options: [
    {
      label: "Alphabetically",
      value: { field: "NAME", direction: "ASC" },
    },
    {
      label: "Price - High to Low",
      value: { field: "PRICE", direction: "DESC" },
    },
    {
      label: "Price - Low to High",
      value: { field: "PRICE", direction: "ASC" },
    },
  ],
};

storiesOf("@components/atoms/SelectCustomize", module)
  .addParameters({ component: SelectCustomize })
  .add("default", () => <SelectCustomize {...DEFAULT_PROPS} />);
