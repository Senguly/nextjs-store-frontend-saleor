import { storiesOf } from "@storybook/react";
import React from "react";

import CustomizeSelectBox from "./index";

// tslint:disable:object-literal-sort-keys
const items = [];

storiesOf("@components/organisms/CustomizeSelectBox", module)
  .addParameters({ component: CustomizeSelectBox })
  .add("default", () => <CustomizeSelectBox options={items} title="asasd" />);
