import i18n from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import * as library18n from "@Qinastha/pulse_library/src/i18n";

const additionalResources = {
  en: {
    translation: {
      "chatHeader.typing": "typing",
      "projectSelect.list": "List of projects",
      "chatNavbar.chat": "Chats",
      "chatNavbar.selectProject": "Please select a project",
      "chatNavbar.addProject": "Please add new chat",
      "layout.create": "Create Chat",
      "chatItem.noMessages": "No messages yet",
      "contextMenu.edit": "Edit message",
      "contextMenu.delete": "Delete message",
      "message.save": "Save changes",
      "chat.placeholder": "Type a message...",
      "login.buttonText": "Log in",
      "login.formTitle": "Log in to your account",
      "manageChat.createTitle": "Create new chat",
      "manageChat.editTitle": "Manage chat",
      "manageChat.createButton": "Create chat",
      "manageChat.editButton": "Update chat",
      "manageChat.deleteButton": "Delete chat",
    },
  },
  ua: {
    translation: {
      "chatHeader.typing": "друкує",
      "projectSelect.list": "Список проектів",
      "chatNavbar.chat": "Чати",
      "chatNavbar.selectProject": "Будь ласка виберіть проект",
      "chatNavbar.addProject": "Будь ласка додайте новий чат",
      "layout.create": "Створити чат",
      "chatItem.noMessages": "Немає повідомлень",
      "contextMenu.edit": "Редагувати повідомлення",
      "contextMenu.delete": "Видалити повідомлення",
      "message.save": "Зберегти зміни",
      "chat.placeholder": "Введіть повідомлення...",
      "login.buttonText": "Увійти",
      "login.formTitle": "Увійти до вашого облікового запису",
      "manageChat.createTitle": "Створити новий чат",
      "manageChat.editTitle": "Управління чатом",
      "manageChat.createButton": "Створити чат",
      "manageChat.editButton": "Оновити чат",
      "manageChat.deleteButton": "Видалити чат",
    },
  },
};

library18n.default.addResources(
  "en",
  "translation",
  additionalResources.en.translation,
);
library18n.default.addResources(
  "ua",
  "translation",
  additionalResources.ua.translation,
);

i18n.use(initReactI18next).init({
  resources: library18n.default.options.resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
