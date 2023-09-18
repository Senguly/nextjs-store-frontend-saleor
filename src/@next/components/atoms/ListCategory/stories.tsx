import { storiesOf } from "@storybook/react";
import React from "react";

import ListCategory from ".";

const DEFAULT_PROPS = {
  ListCategory: [
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
    { key: "category B", value: "category-b" },
  ],
};

storiesOf("@components/atoms/ListCategory", module)
  .addParameters({ component: ListCategory })
  .add("default", () => <ListCategory {...DEFAULT_PROPS} />);
