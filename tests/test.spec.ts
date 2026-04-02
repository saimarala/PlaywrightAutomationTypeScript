console.log("A");

// Wrap in an arrow function so it's a callback, not an immediate execution
setTimeout(() => console.log("B"), 0);

// Use a callback function inside .then() and fix the syntax
Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");