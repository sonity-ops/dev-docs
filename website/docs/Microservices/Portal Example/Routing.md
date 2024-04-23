---
sidebar_position: 5
---

![Router Image](/img/docs/router.png)

For routing we use the good old [React Router](https://reactrouter.com/en/main)

Our routes mainly reside in `src/AppRouter.js`

## Structure of our routes

```js
// Import Route, Switch, Redirect

<>
<Switch fallback={<LoadingFallback/>}>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    ...
    <Route path="/connector-campaign">
       ...
    </Route>
</Switch>
</>
```

So each route routes to a page which is composed of different kinds of components. Though in reality everything is a component.