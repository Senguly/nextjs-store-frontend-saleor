import { storiesOf } from "@storybook/react";
import React from "react";

import ProductDialog from ".";

storiesOf("@components/molecules/ProductDialog", module)
  .addParameters({ component: ProductDialog })
  .add("default", () => <ProductDialog isOpen={null} />);
