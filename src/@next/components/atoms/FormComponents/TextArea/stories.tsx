import { storiesOf } from "@storybook/react";
import React from "react";

import TextArea from ".";

const DEFAULT_PROPS = {
  title: "First name",
  errors: "looix",
};

storiesOf("@components/atoms/TextArea", module)
  .addParameters({ component: TextArea })
  .add("default", () => <TextArea {...DEFAULT_PROPS} />);
