---
sidebar_position: 2
---

In the moment the sonity-gateway and the portal-example run togather in the same container.


### Step 1: Navigate to the master

```sh
git checkout master
```


Make sure master has the latest changes


### Step 2: Build sonity-cubejs


Before building and pushing any containers to the sonity registry make sure your are logged in:

```sh
docker login gitlab-temp.sonity.net:5050/sonity-core-dev
```


```sh
sh build.sh
```

This will create a build and move it to the sonity-gateway



### Step 3: Update the the cluster

<!---
TODO: Document this
-->

Coming soon!
