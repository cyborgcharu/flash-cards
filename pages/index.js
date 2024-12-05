import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FlashcardApp = () => {
  const [cards, setCards] = useState([
    // Core JavaScript Concepts
    { 
      front: "What is hoisting in JavaScript?",
      back: "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope. Variables declared with 'var' are hoisted and initialized as undefined, while 'let' and 'const' are hoisted but not initialized (temporal dead zone). Function declarations are hoisted with their definitions."
    },
    { 
      front: "Explain closures in JavaScript",
      back: "A closure is the combination of a function and the lexical environment within which that function was declared. It allows a function to access variables from its outer scope even after the outer function has returned. Closures are commonly used for data privacy and maintaining state."
    },
    { 
      front: "What is the difference between == and === in JavaScript?",
      back: "== performs type coercion before comparison (loose equality), while === checks both value and type without coercion (strict equality). Example: '5' == 5 returns true, but '5' === 5 returns false. Always prefer === for more predictable comparisons."
    },
    { 
      front: "Explain the event loop in JavaScript",
      back: "The event loop is JavaScript's mechanism for executing code asynchronously. It consists of a call stack for synchronous code, a task queue for callbacks, and a microtask queue for Promises. The event loop continuously checks if the call stack is empty, then processes microtasks, followed by tasks."
    },
    { 
      front: "What is the 'this' keyword in JavaScript?",
      back: "The 'this' keyword refers to the current execution context. Its value depends on how a function is called: In methods, 'this' refers to the object. In regular functions, it refers to global object (or undefined in strict mode). In arrow functions, 'this' retains the value of the enclosing lexical context."
    },
    // ES6+ Features
    { 
      front: "What are arrow functions and how do they differ from regular functions?",
      back: "Arrow functions are a concise syntax for writing function expressions. Key differences: 1) They don't have their own 'this' binding 2) Can't be used as constructors 3) Don't have arguments object 4) Can't be used as methods 5) Have implicit return when written in single-line form."
    },
    { 
      front: "Explain destructuring in JavaScript",
      back: "Destructuring allows unpacking values from arrays or properties from objects into distinct variables. Array example: const [a, b] = [1, 2]. Object example: const {name, age} = person. Can use default values: const {name = 'Anonymous'} = {}. Useful for function parameters and importing modules."
    },
    // Asynchronous JavaScript
    { 
      front: "What is a Promise and what states can it have?",
      back: "A Promise is an object representing eventual completion/failure of an async operation. States: 1) Pending: initial state 2) Fulfilled: operation completed successfully 3) Rejected: operation failed. Promises can be chained with .then() and .catch(), and combined with async/await for cleaner syntax."
    },
    { 
      front: "What is async/await and how does it work?",
      back: "async/await is syntactic sugar over Promises. 'async' declares a function that returns a Promise. 'await' pauses execution until Promise resolves. try/catch blocks handle errors. Example: async function getData() { try { const data = await fetch(url); } catch(error) { console.error(error); } }"
    },
    // Object-Oriented JavaScript
    { 
      front: "Explain prototypal inheritance in JavaScript",
      back: "JavaScript uses prototypal inheritance: objects can inherit properties and methods from other objects (prototypes). Each object has an internal [[Prototype]] link. When accessing a property, JavaScript looks up the prototype chain until found. Created via Object.create() or constructor functions."
    },
    { 
      front: "What are the four principles of OOP in JavaScript?",
      back: "1) Encapsulation: Bundling data and methods that operate on that data within objects 2) Abstraction: Hiding complex implementation details 3) Inheritance: Objects can inherit properties and methods from other objects 4) Polymorphism: Objects can take multiple forms (implemented through method overriding)"
    },
    // Functional Programming
    { 
      front: "What are pure functions?",
      back: "Pure functions are functions that: 1) Given same inputs, always return same output 2) Have no side effects (don't modify external state) 3) Don't depend on external state. Benefits: predictable, testable, cacheable. Example: const add = (a, b) => a + b;"
    },
    { 
      front: "Explain map, filter, and reduce",
      back: "map(): Transforms each array element, returns new array. Example: [1,2,3].map(x => x*2) = [2,4,6]\nfilter(): Creates new array with elements passing test. Example: [1,2,3].filter(x => x>1) = [2,3]\nreduce(): Reduces array to single value. Example: [1,2,3].reduce((sum,x) => sum+x, 0) = 6"
    },
    // Common Gotchas
    { 
      front: "What is variable scope and what are the different types?",
      back: "Scope determines variable accessibility. Types: 1) Global scope: Accessible everywhere 2) Function scope: Accessible within function (var) 3) Block scope: Accessible within block (let/const) 4) Module scope: Accessible within module. Lexical scoping means inner functions can access outer scope variables."
    },
    { 
      front: "What is the temporal dead zone (TDZ)?",
      back: "TDZ is the period between entering scope and variable declaration where let/const variables can't be accessed. Unlike var (undefined), accessing variable in TDZ throws ReferenceError. Example: console.log(x); let x = 1; // ReferenceError. Helps catch errors and enforce better coding practices."
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddCard = () => {
    if (newFront.trim() && newBack.trim()) {
      setCards([...cards, { front: newFront, back: newBack }]);
      setNewFront("");
      setNewBack("");
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">JavaScript Flashcards</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {isAdding ? (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Front</label>
              <Input
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                placeholder="Enter front text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Back</label>
              <Input
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                placeholder="Enter back text"
              />
            </div>
            <Button onClick={handleAddCard}>Save Card</Button>
          </div>
        </Card>
      ) : (
        <>
          <Card 
            className="min-h-64 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:shadow-lg"
            onClick={handleFlip}
          >
            <CardContent className="text-center p-6">
              <div className="text-xl">
                {isFlipped ? cards[currentIndex].back : cards[currentIndex].front}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={cards.length <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-sm text-gray-500">
              Card {currentIndex + 1} of {cards.length}
            </div>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={cards.length <= 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardApp;