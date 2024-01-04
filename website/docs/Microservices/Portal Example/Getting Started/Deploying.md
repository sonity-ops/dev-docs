---
sidebar_position: 3
---

In the moment the sonity-gateway and the portal-example run togather in the same container.


### Step 1: Navigate to the master

```sh
git checkout master
```


Make sure master has the latest changes


:::caution

Make sure that sonity-gateway is in the master branch and it has the latest changes

:::

### Step 2: Build portal-example

```sh
sh build.sh
```

This will create a build and move it to the sonity-gateway


### Step 3: Create Sonity Gateway container


Before building and pushing any containers to the sonity registry make sure your are logged in:

```sh
docker login gitlab-temp.sonity.net:5050/sonity-core-dev
```


Next navigate to the sonity gateway and build it into a container

```sh
cd ../sonity-gateway
sh .build.sh
```


This will package the code into a container and push it to the registry.


### Step 4: Update the the cluster

<!---
TODO: Document this
-->

Coming soon!
