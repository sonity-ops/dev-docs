---
sidebar_position: 1
---

# Installation


### Step 1: Clone
To install Portal example clone it first

```sh
git clone https://gitlab-temp.sonity.net/nacmonad/selenium-api
```


### Step 2: Install dependencies
Install dependencies

```sh
cd selenium-api && yarn
```

You can use npm


```sh
cd selenium-api && npm install
```



### Step 3: Setup

In the project's root directory create `.env` if it doesn't exist

It should look like this:

```env
NODE_ENV=development
USER_ID=<USER ID>
USER_IDS=[<USER ID>]
SONITY_ACCOUNT_ID=<SONITY ACCOUNT ID>
SONITY_ACCOUNT_IDS=[<SONITY ACCOUNT ID>]
JWT_VERIFY_SECRET=<JWT VERIFY SECRET>
AES_KEY=d6F3Efeq
CRON_INTERVAL=3
SONITY_API_ENDPOINT=http://localhost:4000/graphql
SONITY_GATEWAY_URL=http://localhost:4000
REDIS_URL=redis://default:password@127.0.0.1:6379
AWS_ACCESS_KEY_ID=<AWS ACCESS KEY ID>
AWS_SECRET_ACCESS_KEY=<AWS SECRET ACCESS KEY>
AWS_USER_CLIENT_REGION=us-east-2
```

I haved redacted many keys here so our keys are secure.


### Step 4: Give it a run 

```npm run start```
