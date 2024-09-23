import { RequiredInput } from "../interfaces";

export const CHAT_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "name",
    className: "project-pop__input",
    required: true,
    label: "label.name",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "description",
    className: "project-pop__input",
    required: true,
    label: "label.description",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "members",
    className: "project-pop__input",
    required: true,
    label: "label.members",
    autoComplete: "off",
  },
  {
    type: "file",
    name: "avatar",
    className: "project-pop__input",
    required: true,
    label: "label.avatar",
    autoComplete: "off",
  },
];
