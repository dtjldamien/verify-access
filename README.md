# Verify Access

Verify Access utilises the Verify to allow entry to areas where guests are required to provide a form of identification. Think of places such as condominiums, office buildings or even army camps.
Check out the [Google Slides Deck](https://docs.google.com/presentation/d/1XC10NBkJ0npFDTumiXbFib3l9nPaw5tsyan6esTG2Zs/edit?usp=sharing) for the documentation.
Hosted by [Azure Web Service](verify-access.azurewebsites.net).

## Features

- Visitor check in
- Visitor check out
- View list of visitors at the premise

## Tech Stack
- Vue.js - Frontend web application
- Tailwind CSS - UI framework of choice
- Node.js - Backend to provide RESTful APIs and Mock Verify server
- MongoDB - Document database to store visitor records
- Azure - Cloud environment

## Installation
Verify Access requires [Node.js](https://nodejs.org/en/) to run.

1. Install required node modules
```sh
npm install
npm run setup
```

2. Build Vue.js and start Express server
```
npm run build
npm run start
```
