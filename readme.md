## 1. What is the difference between var, let, and const?

**=>**

### var:

- var can be redeclared and updated.
- It doesn't maintain block(if-else, while, for etc.) scope but it maintains function scope or local scope.
- It is hoisted at the top of its scope but initialized with `undefined`.

### let:

- It can be updated but cannot be redeclared at the same scope.
- It maintains block scope.
- It is hoisted but not initialized, so it stays in the Temporal Dead Zone until its declaration line is reached.

### const:

- It cannot be redeclared or updated(but if the value is an object or array, then the inside data can be modified).
- It maintains block scope.
- It must be initialized at the time of declaration.
- It is hoisted but not initialized, so it stays in the Temporal Dead Zone until its declaration line is reached.

---

## 2. What is the difference between map(), forEach(), and filter()?

**=>**

### map():

- It loops through every element of the array.
- It returns a new array with modified element.
- This method doesn't change the original array.
- It returns an array which has the same length as the original one.

### forEach():

- It loops through every element of the array.
- It doesn't return a new array.
- This method doesn't change the original array.

### filter():

- It loops through every element of the array.
- It returns a new array with elements that pass a condition.
- This method doesn't change the original array.
- It returns an array which length can be smaller or equal to the original one.

---

### 3. What are arrow functions in ES6?

**=>** Arrow functions are a shorter way to write functions in javascript. It is introduced in ES6. It uses arrow(`=>`) instead of 'function' keyword. It is shorter and cleaner than normal function. It makes code cleaner especially for small or one line functions. It is often used with array methods like `map()`, `forEach()`, `filter()`.

---

## 4. How does destructuring assignment work in ES6?

**=>** Destructuring assignment in JavaScript is a syntax that allows the unpacking of values from an array or the properties from an object into distinct variables.

There are two types of destructuring. They are: **1. array destructuring**, **2. object destructuring**

### Array destructuring:

This allows extracting elements from an array and assigning them to individual variables based on their position. ex:

```bash
const numbers = [20, 32, 56];
const [firstNumber, secondNumber, thirdNumber, fourthNumber=0] = numbers;

console.log(firstNumber);//20
console.log(secondNumber);//32
console.log(thirdNumber);//56
console.log(fourthNumber);//0
```

Default values can be assigned for elements that might be missing.

### Object destructuring:

This allows extracting properties from an object and assigning them to individual variables based on their property names. ex:

```bash
const person = {name: 'Iqbal', age: 24, profession: 'Web Developer', salary: 20000};

const {name: fullName, age, salary = 0, isMarrie = false, profession: designation} = person;

console.log(fullName);//'Iqbal'
console.log(age);//24
console.log(salary);//20000
console.log(isMarried);//false
console.log(designation);//'Web Developer'
```

Properties can be assigned to variables with different names using a colon(`:`) and default values can be provided with missing properties.

---

## 5. Explain template literals in ES6. How are they different from string concatenation?

**=>** Template literals in ES6 are a new way to work with strings using backticks(``) instead of regular quotes('' or ""). They allow to easily insert variables and expressions directly into strings using the ${} syntax which is called 'Interpolation'. For example:

**By string concatenation:**
`"Hello " + name + "!" + "\n" + "welcome to home";`

**By template literals:**

```bash
`Hello ${name} !
Welcome to home;`
```

</br>Template literals also also make it easy to write multi-line strings without using \n or string concatenation. Compare to traditional string concatenation, template literals are more readable, cleaner and allows expression to insert strings directly, which reduces errors and makes the code shorter and easier to understand.
