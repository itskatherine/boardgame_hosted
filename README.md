# Northcoders House of Games API

## Background

<br>

In this project I have built an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

### Link to the Trello Board here: https://trello.com/invite/b/KZW6PkFm/2547f6caed377a68b6e3889c566069d4/be-nc-games

<br>

## Initialisation Instructions

1. Clone the repo in a suitable location:

```
git clone https://github.com/itskatherine/boardgames.git
```

2. Install dependancies (will need <a href="https://www.npmjs.com/">npm</a> installed)

```
npm install
```

3. Create the development and testing .env files in the root folder of the project, so that you can connect locally to the test and development databases.

Create `.env.test`:

```
PGDATABASE=<nc_games_test>
```

Create `.env.development`:

```
PGDATABASE=<nc_games>
```

4. Setup and seed the local database

```
npm setup-dbs
npm seed
```

5. Run tests to check correct setup (using jest)

```
npm test
```

# Link to Hosted DB

The API is hosted on Heroku and can be accessed here:
https://katherineboardgames.herokuapp.com/api

At this address, all the API's endpoints can be found.

# Requirements

<a href="https://nodejs.org">Node.js</a>
<a href= "https://www.postgresql.org/">PostgreSQL</a>
