---
sidebar_position: 1
---

# Installation


### Step 1: Clone
To install Sonity MQ clone it first

```sh
git clone https://gitlab-temp.sonity.net/nacmonad/sonity-cubejs
```


### Step 2: Install dependencies
Install dependencies

```sh
cd sonity-cubejs && yarn
```

You can use npm


```sh
cd sonity-cubejs && npm install
```



### Step 3: Setup

Make sure your .env file look like the example below:

```.env
CUBEJS_DB_HOST=<db host here>
CUBEJS_DB_PORT=9564
CUBEJS_DB_NAME=postgres
CUBEJS_DB_USER=<db user here>
CUBEJS_DB_PASS=<db pass here>
CUBEJS_DB_TYPE=postgres
CUBEJS_API_SECRET=<db api secret here>
CUBEJS_EXTERNAL_DEFAULT=true
CUBEJS_SCHEDULED_REFRESH_DEFAULT=true
CUBEJS_WEB_SOCKETS=true
CUBEJS_DEV_MODE=true
#CUBEJS_REFRESH_WORKER=false
#CUBEJS_CACHE_AND_QUEUE_DRIVER=memory
```


### Step 4: Give it a run 

```sh
sh build.sh && sh run.sh
```

