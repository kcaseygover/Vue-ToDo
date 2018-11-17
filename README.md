# Vue Todo App

Built with:

* Vue
* Vuex
* Vue Router
* Vue cli
* Axios for api calls
* Jest for tests


### Requirements

* node
* npm

## Project setup

### clone project

```
git clone git@github.com:kcaseygover/Vue-ToDo.git
```
### change to app directory

```
cd app
```

### install dependencies for frontend
```
npm install
```

### Compiles and hot-reloads for development on http://localhost:8080/
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# flask-todo server
## Project set up for backend

Simple todo app REST API.

Built with:

* Flask (web server)
* Marshmallow (object serialization/deserialization)
* SQLAlchemy (ORM)
* Alembic (migrations)
* MySQL (database)


### Requirements

* python >= 3.6.0
* pipenv >= 11.9.0 (e.g. `brew install pipenv` on OS X)
* mysql >= 5.7.21 (use brew)

### Getting started

These instructions assume MySQL is running on `localhost:3306` with the `root` user available.

```
cd server

# Install dependencies
pipenv install

# Create DB
make create_db

# Run migrations
make run_migrations

# Seed database with initial data
make seed

# Run dev server
make run
```

