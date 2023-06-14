# Redux Toolkit Playground

This application aims to understand the process of making network requests and, in general, fetching data within a Redux context. The application's user interface has been developed with Tailwind CSS for a clean, responsive design.

## Table of Contents

1. [Overview](#overview)
2. [Package Description](#package-description)
3. [Installation](#installation)
4. [Scripts](#scripts)
5. [Acknowledgments](#acknowledgments)

## Overview

When a user first visits the application, a network request is made to an outside API. This request fetches a list of users and displays them on the screen. A button is also provided to add new users. When clicked, a request is made to create a new user with a randomly generated name.

Each user entry has a delete button, and an expand button that reveals a list of photo albums associated with the user. Each album also has an expand button that displays a collection of photos within the album.

The user names, album titles, and photos are all randomly generated. However, the randomly generated data is saved to an outside API for future retrieval.

All data is stored on an outside server using the JSON server library. The server houses lists of users, albums, and photos, fetched and stored in the Redux store. Once in the store, they're accessed by React Components and rendered as lists of users, albums, or photos.

The application is designed with bandwidth-constrained users in mind, implementing a lazy fetching strategy that fetches data as it's needed, reducing the load for users on slower internet connections.

Example Photo component when Albums are loaded : 

Component
    | 
    | (1) Mounts and calls useFetchPhotosQuery
    V
Redux Store (RTK Query)
    |
    | (2) Dispatches "fetch request" action
    V
Component
    |
    | (3) Re-renders with loading state and shows spinner
    V
photosApi Middleware
    |
    | (4) Sends HTTP request
    V
Server
    |
    | (5) Returns HTTP response
    V
photosApi Middleware
    |
    | (6) Dispatches "fulfill request" action
    V
Redux Store (RTK Query)
    |
    | (7) Updates state with fetched photos
    V
Component
    |
    | (8) Re-renders with fetched photos and hides spinner
    V
User (viewing component)


## Package Description

The `package.json` includes several packages used in the development of this application. Here's a brief description of each package and its role:

### Dependencies
- `@faker-js/faker`: Used for generating fake data for testing or populating the UI during development.
- `@reduxjs/toolkit`: The official, opinionated, batteries-included toolset for efficient Redux development.
- `axios`: Promise based HTTP client for the browser and Node.js, used to make network requests.
- `classnames`: A simple JavaScript utility for conditionally joining classNames together.
- `json-server`: Used to create a fake REST API for development and testing.
- `react` and `react-dom`: React is used for building the user interface of the app and ReactDOM manages the DOM in relation to that interface.
- `react-icons`: Incorporate popular icons in the project from different icon libraries.
- `tailwindcss`: A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

### Dev Dependencies
- `@typescript-eslint/eslint-plugin`, `eslint`, `eslint-config-prettier`, `eslint-import-resolver-typescript`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-prettier`, `eslint-plugin-react`, `eslint-plugin-react-hooks`: These packages are related to ESLint, which helps to enforce coding style and find and fix problems in the code.
- `@vitejs/plugin-react` and `vite`: Vite is a modern frontend build tool, which is used here along with its React plugin for better development experience and fast hot module replacement.
- `husky` and `lint-staged`: These packages are used for enforcing linting and formatting rules before commits.
- `prettier`, `prettier-plugin-sort-imports`: Prettier is used for code formatting.
- `typescript`: It is used for writing typed JavaScript at any scale.

## Installation

To run this project, clone the repository and install the dependencies:
- git clone https://github.com/vishalcoderathore/redux-toolkit-playground.git
- cd redux-toolkit-playground
- npm install

## Scripts

There are several scripts defined in `package.json`:

- `dev`: Runs the application in development mode.
- `build`: Builds the application for production.
- `lint`: Runs the linter to catch and fix issues in the code.
- `format`: Formats the code using Prettier.
- `preview`: Previews the built application.
- `prepare`: Sets up Husky for Git hooks.

## Acknowledgments

This project was made possible by the Redux Toolkit, JSON Server library, the Faker JS library, and Tailwind CSS. Special thanks to these projects for making data fetching and handling in Redux and developing UI an enjoyable experience.
