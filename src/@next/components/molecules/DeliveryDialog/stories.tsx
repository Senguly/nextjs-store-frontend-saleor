import { storiesOf } from "@storybook/react";
import React from "react";

import DeliveryDialog from ".";

storiesOf("@components/molecules/DeliveryDialog", module)
  .addParameters({ component: DeliveryDialog })
  .add("default", () => <DeliveryDialog />);
