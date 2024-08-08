# Redocs
Is a tool for extracting comments from any Javascript project and generate a markdown for them


## Installation

Clone the project

Navigate to the project

Install any dependencies




## Usage

```sh
node redocs.js input_dir output_dir

```


```sh
node redocs.js ../portal-example /docs

```


## Tags
Redocs supports the following tags


`@page_name` - name here 

`@page_desc` - Page description here

`@author` - Author

`@desc` - description

`@type` - Can either be component, function, class

`@returns` - Returns stuff

`@param` \{type\} param_name  - Parameter tag

`@prop` \{type\} prop_name - Component prop

`@property` \{type\} property_name - Class property

`@example` - Example of usage


## Examples

**Function**
```js
/**
* @name - eat_pizza
* @type - function
* @desc - A function for eating pizza
* @param {int} amount - amount of pizza to eat
* @param {Date} time - time to eat the pizza
* @returns - boolean
*/
function eat_pizza(amount, time){}
```

**Class**
```js
/**
* @name - BrewCoffee
* @type - class
* @desc - a class for brewing coffee
* @property {int} amount - amount of coffee
* @property {string} type - type of coffee
* @propert {boolean} add_sugars - Should we add sugar
* @returns - boolean
*/

class BrewCoffee {};
```

**Component**
```js
/**
* @name - BrewCoffee
* @type - class
* @desc - A component for display the Home Page
* @prop {int} prop_a - Some prop descripition here
* @prop {string} prop_b - Some prop descripiton here
* @returns - null
*/

const HomePage = ({prop_a, prop_b}) => {};
```


**useEffect**
```js
/**
* @name - Notify Bananas Effect
* @desc - This use effect will send a notification if the bananas available are below 3
* @type - function
* @returns - null
*/

React.useEffect(()=> {

}, [bananas])
```