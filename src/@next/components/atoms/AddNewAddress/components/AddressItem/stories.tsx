/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from "@storybook/react";

import AddressItem from ".";

const DEFAULT_PROPS = {
  address: {
    firstName: "Thang",
    lastName: "Pham",
    streetAddress: "91 trna quan khai",
    Apartment: "D4 thuong lai",
    postCode: "1234",
    city: "Da Nang",
    email: "kuthang32@gmail.com",
    phoneNumber: "+84987654123",
    companyName: "NCC soft",
  },
};

storiesOf("@components/atoms/components/AddressItem", module)
  .addParameters({ component: AddressItem })
  .add("default", () => <AddressItem {...DEFAULT_PROPS} />);
