---
sidebar_position: 4
---

# State Management

## Introduction
There many ways of managing state in react but on the Portal Example project we use the following methods:

1. useState 
2. Reducer and Context pattern

### 1. UseState
We use it to manage local state

```js
const [onions, setOnions] = React.useState(0)
```

Sometimes we may drill state into children components through props. Excessive prop drilling should be avoided so we avoid rendering unnecessary components. 

### 2. Reducer and Context pattern
We use this pattern to maintain state that is shared among components


![State Managenent](/img/docs/state_management.png)


The Provider provides a value with the following
- state - The shared state
- hooks - This are our custom hooks
- state management functions - For changing state. These functions secretly executes the `dispatch` method inorder to trigger state changes
- reducers - given the current state and an action, reducers are will return the final state


For an example please checkout [this guide](./Guides/create-a-context)


## How to a Create a Context
Lets say we wanted to create a `HomeProvider` we can take the following steps

### Step 1: Create context
create a HomeContext.js file and add the following

```js
import { createContext } from "react";

const HomeContext = createContext();

export default HomeContext;
```

### Step 2: Create the state
Create HomeState.js file and add the follwoiong

```js
const InitialState = {
 ...
};

export default InititialState
```


### Step 3: Create your reducer

Create a HomeReducer.js abd add the following:

```js
const HomeReducer = (state, action) => {
  const { type, payload } = action;


  switch (type) {
    case "SET_ITEM":
      return {
        ...state,
        item: payload
      };
    ...

  }
}

export default HomeReducer       
```

### Step 4: Create state functions

```js
const HomeStateFunctions = (state, dispatch) => {
  function setUser(user){
    dispatch({
      action: "SET_USER",
      payload: user
    })
  }

  return {
    setUser
  }
}

export default HomeStateFunctions;
```


### Step 5: Create the provider

```js
import React, { useReducer } from "react";
import InitialState from "./InitialState";
import HomeReducer from "./HomeReducer";
import HomeContext from "./HomeContext";
import ActionTypes from "./ActionTypes";
import HomeStateFunctions from "./HomeStateFunctions"

// Other imports here
function HomeProvider({ children }){ 
  const [state, dispatch] = useReducer(HomeReducer, InitialState);
  const stateFunctions = HomeStateFunctons(state, dispatch)

   ...
  const value = {
    state,
    dispatch,
    stateFunctions
    // Anything you need to to be provided also goes in here
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export const useHomeContext() => useContext(HomeContext)

export default HomeProvider;
```


### Step 6: Wrap the root component with the provider

Inside App.js do something like this

```js
...
<HomeProvider>
 <App/>
</HomeProvider>
...
```

### Step 7: Finally Use it

```js
// import useHomeContext

homeCtx = useHomeContext()

const {
    state,
    dispatch
    ...
} = homeCtx
```
