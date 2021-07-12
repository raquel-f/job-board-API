# **Job Board API**

A simple Job Board API with security

## Deployed API

https://ws-job-api.herokuapp.com/


## API Endpoint Documentation

https://app.swaggerhub.com/apis-docs/raquel-f/ws-job-api/1.3.1

## Getting Started

``` sh
# Clone this repository to your local machine
git clone git@github.com:raquel-f/job-board-API.git

# Get into the directory
cd job-board-api

# Make it your own
rm -rf .git && git init

# Add .env file and add your own DB_HOST, DB_USER. DB_PASSWORD, DB_NAME, LIST_PER_PAGE, PORT, AUTH0_AUDIENCE & AUTH0_DOMAIN
DB_HOST=<DATABASE HOST>
DB_USER=<DATABASE USERNAME>
DB_PASSWORD=<DATABASE PASSWORD>
DB_NAME=<DATABASE NAME>
LIST_PER_PAGE=<NUMBER OF RESULTS PER PAGE>
PORT=<PORT THE API RUNS IN>
AUTH0_AUDIENCE=<AUTH0 AUDIENCE URL>
AUTH0_DOMAIN=<AUTH0 DOMAIN URL>

# Install dependencies
npm install

# Run the server locally
npm start

```
