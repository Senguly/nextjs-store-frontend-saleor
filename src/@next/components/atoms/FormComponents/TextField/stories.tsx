import { storiesOf } from "@storybook/react";
import React from "react";

import TextField from ".";

const DEFAULT_PROPS = {
  title: "First name",
  errors: "looix",
};

storiesOf("@components/atoms/TextField", module)
  .addParameters({ component: TextField })
  .add("default", () => <TextField {...DEFAULT_PROPS} />);
