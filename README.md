<<<<<<< HEAD
# team-10-ui

UI deployment

=======
# Team 10 Project - Frontend

This document describes the technologies and project structure used in the frontend implementation for the Team 10 project.

## Technologies

This project utilizes the frontend JavaScript library React with TypeScript, a type safety-enforced superset of JavaScript.

The build tool Vite is also utilized by this project. To run the frontend on a local development server, navigate to its root folder (/frontend), install frontend dependencies using the terminal command `npm install`, and use the command `npm run dev`.

For ready-made, responsive UI elements, this project employs Material UI, a React component library implementing Google's Material Design system.

Although these features are not yet implemented, it is proposed that this project will employ React Router for route configuration and AWS Cognito for user pool management.

## Project Structure

For development purposes, the project's important files are in /src. The project's main file is App.tsx, which imports and displays components from /src/components. These components may themselves be composites of smaller components found in /src/components. Although it is not yet implemented, React Router will allow the user to navigate between different components representing pages (such as src/components/auth/Login/Login.tsx).

The components directory contains three subdirectories corresponding to the three pages depicted in the sprint 2 document.
>>>>>>> 411d9ea (Initial commit for frontend UI)
