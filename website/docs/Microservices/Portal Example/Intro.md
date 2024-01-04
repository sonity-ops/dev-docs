---
sidebar_position: 1
---

# Introduction

Portal Example is the fronted of the Sonity System. 


## Tech Stack

Portal example is build using React JS

### Libraries
These some of the libraries that the POrtal-Example USes

| Name     |  Use    |
|----------|---------|
| ReactJS  | UI    |
| Material UI | UI   |
| TailwindCSS | UI   |
| Apollo Client | Transport |
| CubeJS        | Charts and Reports |
| Push JS       | Notifications |


## State Management
For state management we use the following methods:

1. useState 
2. Reducer and Context pattern

#### 1. UseState
We use it mainly to manage local state

```js
const [onions, setOnions] = React.useState(0)
```

#### 2. Reducer and Context pattern
We use this pattern to maintain state is shared among components


![State Managenent](/img/docs/state_management.png)


The Provider provides a value with the following
- state - The shared state
- hooks - This are our custom hooks
- state management functions - For changing state. These functions secretly executes the `dispatch` method


For an example please checkout [this guide](./Guides/create-a-context)

