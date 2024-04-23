---
sidebar_position: 3
---

## Structure of Components

![Sonity Services](/img/docs/component.png)

A normal component usually takes the following structure

```js

// Imports go here

const ImportContactsDialog = (props) => {
    // Custom Hooks
    const [] = useMessage()           
    const [] = usePrepareFood()      
    
    // Context
    const mainCtx = useMainContext()  
    const tcpsCtx = useTcpsContext()     

    // Access Context
    const {mainCtxState, stateFunctions,...  } = mainCtx 

    // State
    const [loading, setLoading] = React.useState(false)  


    // React hooks
    React.useEffect(()=> {...}, [])
    React.useEffect(()=> {...}, [variable_one])
    React.useEffect(()=> {...}, [variable_two])

    // Functions
    function saveContacts(){
      ...
    }

    return (
      <>
        ...
      </>
    )
}

export default ImportContactsDialog;
```

### 1. Custom Hooks
On most components we usually make use of custom hooks.

Custom usually contains the following

1. Normal functions
2. Effects
3. Apollo queries and mutations - For interacting with the database

Check [structure of hooks](#structure-of-custom-hooks) for more info

### 2. Context
We store system wide state using the `useContext` and `useReducer` pattern. By executing `useMainContext` function we are tapping into the `useContext` function which give us access to value provided by the context.

Depending on what the context provides you may get the following
1. State
2. State Functions
3. Custom Hooks

### 3. State
Nothing to say here.

### 4. React hooks
Nothing to say here.

### 5. Functions
Nothing to say here.

## Structure of Custom Hooks

![Sonity Services](/img/docs/custom_hook.png)

Custom hooks takes the following structure

```js
// imports goes here

const customHook(){

    // State
    const [loading, setLoading] = React.useState(false)           

    // Apollo Queries and Mutations
    const [getList, getListResults] = useLazyQuery(GET_LIST);    
    const [createListItem, createListItemResults] = useMutation(CREATE_LIST_ITEM); 

    // Functions 
    function exportFile(){
      ...
    }
    
    // React hooks
    React.useEffect(()=> {...}, [])
    React.useEffect(()=> {...}, [variable_one])


    // Export queries, mutations, functions etc
    return [
      {
        getList,
        createListItem
      }, 
      {
        getListResults,
        createListIte
      }
    ]
}

export default customHook
```



## Types of Components

We use many type of components, but below are the  most common types of components 

### 1. Providers
Providers can provide state, functions and even hooks to their children components, for example:
HomeProvider provides state, functions and even general custom hooks to its children

### 2. MUI Components
These are MUI components, check [MUI Components](https://mui.com/material-ui/all-components/)


## Styling
We use check [MUI Components](https://mui.com/material-ui/all-components/) by default and modify their props. In some other components we may resort to custom styling, for example:

```js
// Imports here
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  ...
  message: {
    display: "flex",
    alignItems: "center"
  },
  contentRoot: {
    flexWrap: "nowrap"
  }
}));

const CustomComponent = props => {
  const classes = useStyles();
  const {
    ...
  } = props;

  return (
    <React.Fragment>
      <SomeComponent style={{classes.contentRoot}}></SomeComponent>
    </React.Fragment>
  );
};

export default CustomSnackbar;
```