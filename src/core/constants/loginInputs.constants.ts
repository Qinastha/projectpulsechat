import { RequiredInput } from "../interfaces/requiredInput";

export const LOGIN_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "email",
    className: "form-control",
    required: true,
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    className: "form-control",
    required: true,
    label: "Password",
  },
];
