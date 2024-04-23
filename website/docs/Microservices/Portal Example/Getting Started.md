---
sidebar_position: 1
---


### Step 1: Clone
To install Portal example clone it first

```sh
git clone https://gitlab-temp.sonity.net/nacmonad/portal-example
```


### Step 2: Install dependencies
Install dependencies

```sh
cd portal-example && yarn
```

You can use npm


```sh
cd portal-example && npm install
```



### Step 3: Setup

In the project's root directory create `.env.development` if it doesn't exist

It should look like this:

```env
REACT_APP_ENDPOINT=http://localhost:3031
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
REACT_APP_SOCKET_ENDPOINT=ws://localhost:4000/ws
REACT_APP_SUBSCRIPTIONS_ENDPOINT=ws://localhost:4000/subscriptions
REACT_APP_CUBEJS_ENDPOINT=https://cubejs.sonity.net
REACT_APP_AES_KEY=d6F3Efeq
REACT_APP_AWS_USER_CLIENT_ID=AKIARJD5QGMSTAWNL3HQ
REACT_APP_AWS_USER_CLIENT_SECRET=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
REACT_APP_AWS_USER_CLIENT_REGION=us-east-2
```


### Step 4: Give it a run 

```npm run install``` or ```yarn start```


You can point it whereever your sonity-gateway instance is sitting