import { RequiredInput } from "../interfaces";

export const CHAT_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "name",
    className: "project-pop__input",
    required: true,
    label: "Name",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "description",
    className: "project-pop__input",
    required: true,
    label: "Description",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "members",
    className: "project-pop__input",
    required: true,
    label: "Select chat members",
    autoComplete: "off",
  },
  {
    type: "file",
    name: "avatar",
    className: "project-pop__input",
    required: true,
    label: "Avatar",
    autoComplete: "off",
  },
];
