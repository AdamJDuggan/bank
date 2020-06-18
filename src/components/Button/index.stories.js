import React from "react";

import { Button } from ".";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => <Button label="Default"></Button>;
export const Primary = () => <Button primary label="Primary" />;
export const Secondary = () => <Button secondary label="Primary" />;

export const Disabled = () => <Button disabled label="Disabled" />;
