# ProjectPulse Chat Application

This project is a **React-based** chat application that enables registered users to collaborate by choosing projects and chatting with other members in real time. The application utilizes **Routing**, **Redux** for state management, **TypeScript** for type safety, and **Socket.io** for seamless real-time communication.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Getting Started

Before diving into the code, make sure you have registered on the parent project [ProjectPulse](https://github.com/Qinastha/ProjectPulse.git). This is where user accounts are managed and where you can create and manage your projects.

To get started with this chat application:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Qinastha/projectpulsechat.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd projectpulsechat
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app will automatically reload if you make edits.\
You will also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It bundles React in production mode and optimizes the build for the best performance.

The build is minified and filenames include hashes for caching.\
Your app is now ready to be deployed!

### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

If you’re not satisfied with the build tool and configuration, you can `eject` at any time. This command will copy all the configuration files and transitive dependencies (Webpack, Babel, ESLint, etc.) right into your project, giving you full control over them.

## Features

- **User Authentication**: Secure login for registered users through the parent [ProjectPulse](https://github.com/AntoxaAlex/ProjectPulse.git) platform.
- **Project-Based Chat**: Users can choose from their list of projects to engage in focused discussions.
- **Real-Time Communication**: Instant updates and messages powered by **Socket.io**.
- **Redux-Powered State Management**: Efficient state handling using Redux.
- **TypeScript Support**: Strong typing for reliable code with fewer errors.
- **Axios**: For handling HTTP requests to the backend.

## Usage

Once logged in, users can:

- **Select a Project**: Choose from a list of projects they are part of.
- **Start a Chat**: Engage in conversations with other project members.
- **Receive and Send Messages**: Get and send real-time messages.

## Custom Library

This project utilizes a custom components and methods through
library, [Pulse Library](https://github.com/Qinastha/pulse_library.git), to enhance functionality and maintain
consistency across the application.

## Acknowledgements

- **Parent Project**: This chat application is part of the larger [ProjectPulse](https://github.com/Qinastha/ProjectPulse.git) ecosystem.
- **Socket.io**: For enabling real-time communication.