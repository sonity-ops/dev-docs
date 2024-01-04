# Create a Context
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

### Step 4: Create the provider

```js
import React, { useReducer } from "react";
import InitialState from "./InitialState";
import HomeReducer from "./HomeReducer";
import HomeContext from "./HomeContext";
import ActionTypes from "./ActionTypes";

// Other imports here
function HomeProvider({ children }){ 
  const [state, dispatch] = useReducer(HomeReducer, InitialState);

   ...
  const value = {
    state,
    dispatch,
    // Anything you need to to be provided also goes in here
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export const useHomeContext() => useContext(HomeContext)

export default HomeProvider;
```


### Step 5: Wrap the root component with the provider

Inside App.js do something like this

```js
...
<HomeProvider>
 <App/>
</HomeProvider>
...
```

### Step 6: Finally Use it

```js
// import useHomeContext

homeCtx = useHomeContext()

const {
    state,
    dispatch
    ...
} = homeCtx
```
