import { storiesOf } from "@storybook/react";
import React from "react";

import ServiceTimeDialog from ".";

const DEFAULT_PROPS = {
  title: "Delivery & pickup schedule",
  isOpen: () => null,
};

storiesOf("@components/molecules/ServiceTimeDialog", module)
  .addParameters({ component: ServiceTimeDialog })
  .add("default", () => <ServiceTimeDialog {...DEFAULT_PROPS} />);
