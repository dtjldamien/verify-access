# Verify Access

Verify Access utilises the Verify to allow entry to areas where guests are required to provide a form of identification. Think of places such as condominiums, office buildings or even army camps.
Check out the [Google Slides Deck](https://docs.google.com/presentation/d/1XC10NBkJ0npFDTumiXbFib3l9nPaw5tsyan6esTG2Zs/edit?usp=sharing) for the documentation.

## Features

- Visitor check in
- Visitor check out
- View list of visitors at the premise

## Tech Stack
- Vue.js - Frontend web application
- Tailwind CSS - UI framework of choice
- Django - Backend to provide RESTful APIs
- SQLite - Database shipped with Django
- Azure - Cloud environment

## Installation
Verify Access requires [Python 3](https://www.python.org/), [pipenv](https://pypi.org/project/pipenv/), [Node.js](https://nodejs.org/en/) to run.

1. Run Django
```sh
cd verify-access-django
pipenv shell
python manage.py migrate
python manage.py runserver
```

2. Run Vue.js
```sh
cd verify-access-vue
yarn
yarn serve
```
