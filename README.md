# Backend to tinfort App

## Installation

Run project 

```
yarn dev
```

## .env file example

```
APP_URL = http://localhost:3001

DB_CONNECT = mongodb+srv://<USER>:<PASSWORD>@mongodb.net/tinfort?retryWrites=true&w=majority
TOKEN_SECRET = <Token secret to use in jwt authentication>

#local or s3
STORAGE_TYPE = local                   

AWS_ACCESS_KEY_ID = < your AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY = < your AWS_SECRET_ACCESS_KEY>
AWS_DEFAULT_REGION = < your AWS_DEFAULT_REGION>

#credentials for fortnitetracker API
FORTNITE_API_URL = https://api.fortnitetracker.com
FORTNITE_TRN_API_KEY = < your KEY>


#credentials for user this api: https://github.com/qlaffont/fortnite-api
CLIENT_LAUNCHER_TOKEN = <your CLIENT_LAUNCHER_TOKEN>
FORTNITE_CLIENT_TOKEN = <your FORTNITE_CLIENT_TOKEN>
```

## Register route( example with Insomnia)
![alt text](https://ibb.co/DgqYJ1b)