import { RequiredInput } from "../interfaces/requiredInput";

export const LOGIN_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "email",
    className: "form-control",
    required: true,
    label: "label.email",
    autoComplete: "off",
  },
  {
    type: "password",
    name: "password",
    className: "form-control",
    required: true,
    label: "label.password",
    autoComplete: "off",
  },
];
