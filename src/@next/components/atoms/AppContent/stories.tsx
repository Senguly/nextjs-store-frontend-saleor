import { storiesOf } from "@storybook/react";
import React from "react";

import AppContent from ".";

storiesOf("@components/atoms/AppContent", module)
  .addParameters({ component: AppContent })
  .add("default", () => <AppContent />);
