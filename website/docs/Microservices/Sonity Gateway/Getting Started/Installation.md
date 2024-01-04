---
sidebar_position: 1
---

# Installation


### Step 1: Clone
To install Portal example clone it first

```sh
git clone https://gitlab-temp.sonity.net/nacmonad/sonity-gateway
```


### Step 2: Install dependencies
Install dependencies

```sh
cd sonity-gateway && yarn

npm install --global nodemon
```

You can use npm


```sh
cd sonity-gateway && npm install
```



### Step 3: Setup

In the project's root directory create `.env` if it doesn't exist

It should look like this:

```env
NODE_ENV=development
AES_KEY=d6F3Efeq
ACCESS_TOKEN_SECRET=X6p4aHaSt1lBUH07maW_8EFJkJbzcYVs
SONITY_REDIRECT_URL=https://app.sonity.net/portal
SONITY_HOSTNAME=https://app.sonity.net
SMTP_HOST=redacted...
SMTP_USER=operations@sonity.net
SMTP_USERNAME=AKIARJD5QGMSTYSAXGCC
SMTP_PASS=redacted...

SONITY_MQ_HOST=http://localhost:8888
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USER=
REDIS_PASSWORD=

OPENAI_API_KEYcvx=redacted...
OPENAI_API_KEY=redacted...
STRIPE_API_KEY=redacted...
STRIPE_SECRET_KEY=redacted...
STRIPE_WEBHOOK_KEY=redacted...
STRIPE_WEBHOOK_TEST_KEY=redacted...

```

I haved redacted many keys here so our keys are secure.


### Step 4: Give it a run 

```nodemon src```

