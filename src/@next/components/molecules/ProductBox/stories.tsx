import { storiesOf } from "@storybook/react";
import React from "react";

import ProductBox from "./ProductBox";

const DEFAULT_PROPS = {
  product: {
    name: "Product Name",
    price: "€ 10,00",
    description:
      "Product description such as some ingredient, ingredient, ingredient, ingredient, ingredient, ingredient, ingredient, ingredient, ingredient, ingredient.",
  },
};

storiesOf("@components/molecules/ProductBox", module)
  .addParameters({ component: ProductBox })
  .add("default", () => <ProductBox {...DEFAULT_PROPS} />);
