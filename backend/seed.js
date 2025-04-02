require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Problem = require('./models/problemModel');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/edabit-clone')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Sample problems
const problems = [
    {
        title: 'Reverse a String',
        description: 'Write a function that reverses a string. The input string is given as an array of characters. You must do this by modifying the input array in-place with O(1) extra memory.\n\nExample:\nInput: ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]',
        difficulty: 'Easy',
        category: 'JavaScript',
        starterCode: 'function reverseString(s) {\n  // Write your code here\n}',
        testCases: [
            {
                input: JSON.stringify(["h", "e", "l", "l", "o"]),
                output: JSON.stringify(["o", "l", "l", "e", "h"])
            },
            {
                input: JSON.stringify(["H", "a", "n", "n", "a", "h"]),
                output: JSON.stringify(["h", "a", "n", "n", "a", "H"])
            }
        ],
        solution: 'function reverseString(s) {\n  
        let left = 0;\n  let right = s.length - 1;\n  \n  while (left < right) {\n    const temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    left++;\n    right--;\n  }\n  \n  return s;\n}',
        points: 10
    },
    {
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
        difficulty: 'Easy',
        category: 'JavaScript',
        starterCode: 'function twoSum(nums, target) {\n  // Write your code here\n}',
        testCases: [
            {
                input: JSON.stringify([[2, 7, 11, 15], 9]),
                output: JSON.stringify([0, 1])
            },
            {
                input: JSON.stringify([[3, 2, 4], 6]),
                output: JSON.stringify([1, 2])
            },
            {
                input: JSON.stringify([[3, 3], 6]),
                output: JSON.stringify([0, 1])
            }
        ],
        solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return null;\n}',
        points: 15
    },
    {
        title: 'FizzBuzz',
        description: 'Write a function that returns an array containing the numbers from 1 to n. But for multiples of three, the array should contain "Fizz" instead of the number, and for multiples of five, the array should contain "Buzz". For numbers which are multiples of both three and five, the array should contain "FizzBuzz".\n\nExample:\nInput: n = 15\nOutput: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]',
        difficulty: 'Easy',
        category: 'JavaScript',
        starterCode: 'function fizzBuzz(n) {\n  // Write your code here\n}',
        testCases: [
            {
                input: JSON.stringify(3),
                output: JSON.stringify([1, 2, "Fizz"])
            },
            {
                input: JSON.stringify(5),
                output: JSON.stringify([1, 2, "Fizz", 4, "Buzz"])
            },
            {
                input: JSON.stringify(15),
                output: JSON.stringify([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"])
            }
        ],
        solution: 'function fizzBuzz(n) {\n  const result = [];\n  \n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      result.push("FizzBuzz");\n    } else if (i % 3 === 0) {\n      result.push("Fizz");\n    } else if (i % 5 === 0) {\n      result.push("Buzz");\n    } else {\n      result.push(i);\n    }\n  }\n  \n  return result;\n}',
        points: 10
    },
    {
        title: 'React Counter Component',
        description: 'Create a simple counter component in React that has increment and decrement buttons. The counter should not go below 0.\n\nRequirements:\n- Use React useState hook\n- Increment button increases count by 1\n- Decrement button decreases count by 1 but stops at 0\n- Display the current count',
        difficulty: 'Easy',
        category: 'React',
        starterCode: 'function Counter() {\n  // Write your code here\n  \n  return (\n    <div>\n      {/* Your counter UI */}\n    </div>\n  );\n}',
        testCases: [
            {
                input: JSON.stringify("render"),
                output: JSON.stringify("Component renders with initial count of 0")
            },
            {
                input: JSON.stringify("increment"),
                output: JSON.stringify("Count increases by 1 when increment button is clicked")
            },
            {
                input: JSON.stringify("decrement"),
                output: JSON.stringify("Count decreases by 1 when decrement button is clicked but never goes below 0")
            }
        ],
        solution: 'function Counter() {\n  const [count, setCount] = React.useState(0);\n  \n  const increment = () => {\n    setCount(prevCount => prevCount + 1);\n  };\n  \n  const decrement = () => {\n    setCount(prevCount => Math.max(0, prevCount - 1));\n  };\n  \n  return (\n    <div>\n      <h2>Counter: {count}</h2>\n      <button onClick={increment}>Increment</button>\n      <button onClick={decrement}>Decrement</button>\n    </div>\n  );\n}',
        points: 20
    },
    {
        title: 'Express API Route',
        description: 'Create a simple Express.js route that returns a list of users. The route should handle GET requests to "/api/users" and return a JSON response with a status code of 200.\n\nThe response should have the following structure:\n{\n  "success": true,\n  "users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]\n}',
        difficulty: 'Medium',
        category: 'Node.js',
        starterCode: '// Express app is already initialized as "app"\n\n// Write your code here',
        testCases: [
            {
                input: JSON.stringify("GET /api/users"),
                output: JSON.stringify({
                    "success": true,
                    "users": [{ "id": 1, "name": "John" }, { "id": 2, "name": "Jane" }]
                })
            }
        ],
        solution: '// Express app is already initialized as "app"\n\napp.get("/api/users", (req, res) => {\n  const users = [\n    { id: 1, name: "John" },\n    { id: 2, name: "Jane" }\n  ];\n  \n  res.status(200).json({\n    success: true,\n    users: users\n  });\n});',
        points: 25
    },
    {
        title: 'Palindrome Checker',
        description: 'Write a function that checks if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward, ignoring spaces, punctuation, and capitalization.\n\nExamples:\n- "A man, a plan, a canal, Panama" should return true\n- "race a car" should return false',
        difficulty: 'Medium',
        category: 'JavaScript',
        starterCode: 'function isPalindrome(str) {\n  // Write your code here\n}',
        testCases: [
            {
                input: JSON.stringify("A man, a plan, a canal, Panama"),
                output: JSON.stringify(true)
            },
            {
                input: JSON.stringify("race a car"),
                output: JSON.stringify(false)
            },
            {
                input: JSON.stringify("Madam"),
                output: JSON.stringify(true)
            }
        ],
        solution: 'function isPalindrome(str) {\n  // Remove non-alphanumeric characters and convert to lowercase\n  const cleanStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();\n  \n  // Check if the string reads the same forward and backward\n  return cleanStr === cleanStr.split("").reverse().join("");\n}',
        points: 20
    },
    {
        title: 'MongoDB User Schema',
        description: 'Create a Mongoose schema for a User with the following requirements:\n\n- username: String, required, unique, minimum 3 characters\n- email: String, required, unique, must be a valid email\n- password: String, required, minimum 8 characters\n- age: Number, minimum 13\n- createdAt: Date, default to current date\n- isActive: Boolean, default to true\n\nDon\'t forget to export the model!',
        difficulty: 'Medium',
        category: 'MongoDB',
        starterCode: 'const mongoose = require("mongoose");\n\n// Write your code here',
        testCases: [
            {
                input: JSON.stringify("validate schema"),
                output: JSON.stringify("Schema passes all requirements")
            }
        ],
        solution: 'const mongoose = require("mongoose");\n\nconst userSchema = new mongoose.Schema({\n  username: {\n    type: String,\n    required: true,\n    unique: true,\n    minlength: 3\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, "Please provide a valid email"]\n  },\n  password: {\n    type: String,\n    required: true,\n    minlength: 8\n  },\n  age: {\n    type: Number,\n    min: 13\n  },\n  createdAt: {\n    type: Date,\n    default: Date.now\n  },\n  isActive: {\n    type: Boolean,\n    default: true\n  }\n});\n\nmodule.exports = mongoose.model("User", userSchema);',
        points: 25
    },
    {
        title: 'React Todo List',
        description: 'Create a simple Todo List component in React that allows users to add new todos, mark them as complete, and delete them.\n\nRequirements:\n- Use the useState hook to manage the todo list\n- Each todo should have: id, text, and completed (boolean) properties\n- Include an input field and button to add new todos\n- Each todo item should have a checkbox to toggle completion and a delete button\n- Completed todos should have a line-through style',
        difficulty: 'Medium',
        category: 'React',
        starterCode: 'function TodoList() {\n  // Write your code here\n  \n  return (\n    <div>\n      {/* Your Todo List UI */}\n    </div>\n  );\n}',
        testCases: [
            {
                input: JSON.stringify("render"),
                output: JSON.stringify("Component renders with an empty todo list and add form")
            },
            {
                input: JSON.stringify("add todo"),
                output: JSON.stringify("New todo gets added to the list when form submitted")
            },
            {
                input: JSON.stringify("toggle todo"),
                output: JSON.stringify("Todo toggles between completed and active state")
            }
        ],
        solution: 'function TodoList() {\n  const [todos, setTodos] = React.useState([]);\n  const [input, setInput] = React.useState("");\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!input.trim()) return;\n    \n    const newTodo = {\n      id: Date.now(),\n      text: input,\n      completed: false\n    };\n    \n    setTodos([...todos, newTodo]);\n    setInput("");\n  };\n  \n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo => \n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n  \n  const deleteTodo = (id) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n  \n  return (\n    <div className="todo-list">\n      <h2>Todo List</h2>\n      \
      <form onSubmit={handleSubmit}>\
        <input \
          type="text" \
          value={input} \
          onChange={(e) => setInput(e.target.value)} \
          placeholder="Add a new todo"\
        />\
        <button type="submit">Add</button>\
      </form>\
      \
      <ul>\
        {todos.map(todo => (\
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>\
            <input \
              type="checkbox" \
              checked={todo.completed} \
              onChange={() => toggleTodo(todo.id)} \
            />\
            {todo.text}\
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>\
          </li>\
        ))}\
      </ul>\
    </div>\
  );\
}',
        points: 30
    },
    {
        title: 'LRU Cache Implementation',
        description: 'Implement an LRU (Least Recently Used) cache. The cache should have a fixed size and support the following operations:\n\n- `get(key)`: Get the value of the key if the key exists in the cache, otherwise return -1.\n- `put(key, value)`: Update or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.\n\nBoth operations should have an average time complexity of O(1).',
        difficulty: 'Hard',
        category: 'JavaScript',
        starterCode: 'class LRUCache {\n  constructor(capacity) {\n    // Initialize your data structure here\n  }\n  \n  get(key) {\n    // Return the value of the key if it exists, otherwise return -1\n  }\n  \n  put(key, value) {\n    // Update the value or add the key-value pair to the cache\n    // If capacity is reached, remove the least recently used item\n  }\n}',
        testCases: [
            {
                input: JSON.stringify([["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["put", 4, 4], ["get", 1], ["get", 3], ["get", 4]]),
                output: JSON.stringify([null, null, 1, null, -1, null, -1, 3, 4])
            }
        ],
        solution: 'class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  \n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    \n    // Get current value and refresh its position\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    \n    return value;\n  }\n  \n  put(key, value) {\n    // If key exists, refresh its position\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    }\n    // If at capacity, remove least recently used (first item in map)\n    else if (this.cache.size >= this.capacity) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    \n    this.cache.set(key, value);\n  }\n}',
        points: 50
    },
    {
        title: 'Node.js REST API with Error Handling',
        description: 'Create a complete Express.js REST API endpoint for a product resource with proper error handling. The endpoint should handle all CRUD operations and implement middleware for error handling.\n\nRequirements:\n- Implement routes for GET, POST, PUT, and DELETE operations\n- Include proper validation and error handling\n- Use async/await with try/catch blocks\n- Implement a custom error handler middleware\n- Return appropriate status codes and error messages\n\nAssume you have a Product model already defined.',
        difficulty: 'Hard',
        category: 'Node.js',
        starterCode: '// Express router for product routes\nconst express = require("express");\nconst router = express.Router();\n\n// Assume Product model is already defined\nconst Product = require("../models/Product");\n\n// Implement your routes here\n\n\n// Don\'t forget error handling middleware\n\n\nmodule.exports = router;',
        testCases: [
            {
                input: JSON.stringify("GET /api/products"),
                output: JSON.stringify("Returns all products with proper error handling")
            }
        ],
        solution: '// Express router for product routes\nconst express = require("express");\nconst router = express.Router();\n\n// Assume Product model is already defined\nconst Product = require("../models/Product");\n\n// Custom error class\nclass ApiError extends Error {\n  constructor(statusCode, message) {\n    super(message);\n    this.statusCode = statusCode;\n  }\n}\n\n// Async handler to catch errors\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\n// Get all products\nrouter.get("/", asyncHandler(async (req, res) => {\n  const products = await Product.find({});\n  res.status(200).json(products);\n}));\n\n// Get single product\nrouter.get("/:id", asyncHandler(async (req, res) => {\n  const product = await Product.findById(req.params.id);\n  \n  if (!product) {\n    throw new ApiError(404, "Product not found");\n  }\n  \n  res.status(200).json(product);\n}));\n\n// Create product\nrouter.post("/", asyncHandler(async (req, res) => {\n  const { name, price, description } = req.body;\n  \n  if (!name || !price) {\n    throw new ApiError(400, "Name and price are required");\n  }\n  \n  const product = await Product.create({\n    name,\n    price,\n    description\n  });\n  \n  res.status(201).json(product);\n}));\n\n// Update product\nrouter.put("/:id", asyncHandler(async (req, res) => {\n  let product = await Product.findById(req.params.id);\n  \n  if (!product) {\n    throw new ApiError(404, "Product not found");\n  }\n  \n  product = await Product.findByIdAndUpdate(\n    req.params.id,\n    req.body,\n    { new: true, runValidators: true }\n  );\n  \n  res.status(200).json(product);\n}));\n\n// Delete product\nrouter.delete("/:id", asyncHandler(async (req, res) => {\n  const product = await Product.findById(req.params.id);\n  \n  if (!product) {\n    throw new ApiError(404, "Product not found");\n  }\n  \n  await product.remove();\n  res.status(200).json({ success: true });\n}));\n\n// Error handler middleware\nrouter.use((err, req, res, next) => {\n  const statusCode = err.statusCode || 500;\n  \n  res.status(statusCode).json({\n    success: false,\n    error: err.message || "Server Error",\n    stack: process.env.NODE_ENV === "production" ? null : err.stack\n  });\n});\n\nmodule.exports = router;',
        points: 60
    },
    {
        title: 'React Data Grid with Filtering and Sorting',
        description: 'Build a reusable data grid component in React that supports column sorting, filtering, and pagination.\n\nRequirements:\n- Accept a data array and column definitions as props\n- Implement column sorting (ascending/descending)\n- Add a search bar that filters across all columns\n- Implement pagination with selectable page size\n- Handle loading and empty states\n- Make the component reusable and customizable',
        difficulty: 'Hard',
        category: 'React',
        starterCode: 'function DataGrid({ data, columns, loading }) {\n  // Implement your data grid here\n  \n  return (\n    <div className="data-grid">\n      {/* Your implementation */}\n    </div>\n  );\n}',
        testCases: [
            {
                input: JSON.stringify("render"),
                output: JSON.stringify("Component renders the data in a table format")
            },
            {
                input: JSON.stringify("sort"),
                output: JSON.stringify("Clicking on column header sorts data in ascending/descending order")
            },
            {
                input: JSON.stringify("filter"),
                output: JSON.stringify("Typing in search box filters data across all columns")
            }
        ],
        solution: 'function DataGrid({ data = [], columns = [], loading = false }) {\n  const [sortConfig, setSortConfig] = React.useState({\n    key: null,\n    direction: "ascending"\n  });\n  const [searchTerm, setSearchTerm] = React.useState("");\n  const [currentPage, setCurrentPage] = React.useState(1);\n  const [pageSize, setPageSize] = React.useState(10);\n  \n  // Sorting function\n  const sortedData = React.useMemo(() => {\n    let sortableData = [...data];\n    if (sortConfig.key !== null) {\n      sortableData.sort((a, b) => {\n        if (a[sortConfig.key] < b[sortConfig.key]) {\n          return sortConfig.direction === "ascending" ? -1 : 1;\n        }\n        if (a[sortConfig.key] > b[sortConfig.key]) {\n          return sortConfig.direction === "ascending" ? 1 : -1;\n        }\n        return 0;\n      });\n    }\n    return sortableData;\n  }, [data, sortConfig]);\n  \n  // Filtering function\n  const filteredData = React.useMemo(() => {\n    return sortedData.filter(item => {\n      return Object.values(item).some(value => \n        String(value).toLowerCase().includes(searchTerm.toLowerCase())\n      );\n    });\n  }, [sortedData, searchTerm]);\n  \n  // Pagination\n  const totalPages = Math.ceil(filteredData.length / pageSize);\n  const paginatedData = React.useMemo(() => {\n    const start = (currentPage - 1) * pageSize;\n    return filteredData.slice(start, start + pageSize);\n  }, [filteredData, currentPage, pageSize]);\n  \n  // Request sort handler\n  const requestSort = (key) => {\n    let direction = "ascending";\n    if (sortConfig.key === key && sortConfig.direction === "ascending") {\n      direction = "descending";\n    }\n    setSortConfig({ key, direction });\n  };\n  \n  // Handle page change\n  const changePage = (page) => {\n    setCurrentPage(Math.max(1, Math.min(page, totalPages)));\n  };\n  \n  if (loading) {\n    return <div className="loading">Loading...</div>;\n  }\n  \n  if (data.length === 0) {\n    return <div className="empty-state">No data available</div>;\n  }\n  \n  return (\n    <div className="data-grid">\n      {/* Search bar */}\n      <div className="search-container">\n        <input\
          type="text"\
          placeholder="Search..."\
          value={searchTerm}\
          onChange={(e) => setSearchTerm(e.target.value)}\
        />\
      </div>\
      \
      {/* Data table */}\
      <table>\
        <thead>\
          <tr>\
            {columns.map(column => (\
              <th \
                key={column.key} \
                onClick={() => requestSort(column.key)}\
                className={sortConfig.key === column.key ? sortConfig.direction : ""}\
              >\
                {column.label}\
                {sortConfig.key === column.key && (\
                  <span>\
                    {sortConfig.direction === "ascending" ? " ↑" : " ↓"}\
                  </span>\
                )}\
              </th>\
            ))}\
          </tr>\
        </thead>\
        <tbody>\
          {paginatedData.map((row, rowIndex) => (\
            <tr key={rowIndex}>\
              {columns.map(column => (\
                <td key={column.key}>{row[column.key]}</td>\
              ))}\
            </tr>\
          ))}\
        </tbody>\
      </table>\
      \
      {/* Pagination */}\
      <div className="pagination">\
        <button \
          onClick={() => changePage(currentPage - 1)}\
          disabled={currentPage === 1}\
        >\
          Previous\
        </button>\
        <span>Page {currentPage} of {totalPages}</span>\
        <button \
          onClick={() => changePage(currentPage + 1)}\
          disabled={currentPage === totalPages}\
        >\
          Next\
        </button>\
        <select \
          value={pageSize} \
          onChange={(e) => setPageSize(Number(e.target.value))}\
        >\
          <option value={5}>5 per page</option>\
          <option value={10}>10 per page</option>\
          <option value={25}>25 per page</option>\
          <option value={50}>50 per page</option>\
        </select>\
      </div>\
    </div>\
  );\
}',
        points: 60
    },
    {
        title: 'Full-Stack Next.js App with Authentication',
        description: 'Create a full-stack Next.js application with JWT authentication, protected routes, and server-side rendering.\n\nRequirements:\n- Implement API routes for user registration and login\n- Set up JWT authentication with secure HTTP-only cookies\n- Create protected pages that require authentication\n- Implement server-side rendering for protected routes\n- Add a logout functionality\n- Handle authentication errors properly',
        difficulty: 'Expert',
        category: 'Next.js',
        starterCode: '// This problem requires multiple files\n// Start with the auth API route\n// pages/api/auth/login.js\n\nexport default async function handler(req, res) {\n  // Implement login functionality\n}',
        testCases: [
            {
                input: JSON.stringify("login"),
                output: JSON.stringify("Returns JWT token in HTTP-only cookie with successful login")
            },
            {
                input: JSON.stringify("protected route"),
                output: JSON.stringify("Protected routes redirect to login page when not authenticated")
            }
        ],
        solution: '// pages/api/auth/login.js\nimport cookie from "cookie";\nimport jwt from "jsonwebtoken";\n\nexport default async function handler(req, res) {\n  if (req.method !== "POST") {\n    return res.status(405).json({ message: "Method not allowed" });\n  }\n\n  const { email, password } = req.body;\n\n  try {\n    // Validate credentials (simplified for brevity)\n    // In a real app, you would query your database\n    if (email !== "user@example.com" || password !== "password123") {\n      return res.status(401).json({ message: "Invalid credentials" });\n    }\n\n    // Create token\n    const token = jwt.sign(\n      { id: "user_id", email },\n      process.env.JWT_SECRET,\n      { expiresIn: "1d" }\n    );\n\n    // Set HTTP-only cookie\n    res.setHeader(\n      "Set-Cookie",\n      cookie.serialize("token", token, {\n        httpOnly: true,\n        secure: process.env.NODE_ENV !== "development",\n        maxAge: 86400,\n        sameSite: "strict",\n        path: "/",\n      })\n    );\n\n    res.status(200).json({ success: true });\n  } catch (error) {\n    res.status(500).json({ message: "Something went wrong" });\n  }\n}\n\n// pages/api/auth/logout.js\nimport cookie from "cookie";\n\nexport default function handler(req, res) {\n  res.setHeader(\n    "Set-Cookie",\n    cookie.serialize("token", "", {\n      httpOnly: true,\n      expires: new Date(0),\n      path: "/",\n    })\n  );\n  \n  res.status(200).json({ success: true });\n}\n\n// utils/auth.js\nimport jwt from "jsonwebtoken";\n\nexport function getServerSideAuth(req) {\n  const { token } = req.cookies;\n  \n  if (!token) {\n    return { isAuthenticated: false };\n  }\n  \n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    return { isAuthenticated: true, user: decoded };\n  } catch (error) {\n    return { isAuthenticated: false };\n  }\n}\n\n// Example protected page\n// pages/dashboard.js\nimport { useRouter } from "next/router";\nimport { useEffect } from "react";\nimport { getServerSideAuth } from "../utils/auth";\n\nexport default function Dashboard({ isAuthenticated, user }) {\n  const router = useRouter();\n  \n  useEffect(() => {\n    if (!isAuthenticated) {\n      router.push("/login");\n    }\n  }, [isAuthenticated, router]);\n  \n  if (!isAuthenticated) {\n    return null;\n  }\n  \n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <p>Welcome, {user.email}</p>\n    </div>\n  );\n}\n\nexport async function getServerSideProps({ req, res }) {\n  const auth = getServerSideAuth(req);\n  \n  if (!auth.isAuthenticated) {\n    return {\n      redirect: {\n        destination: "/login",\n        permanent: false,\n      },\n    };\n  }\n  \n  return {\n    props: auth,\n  };\n}',
        points: 100
    },
    {
        title: 'Microservices Architecture with MongoDB',
        description: 'Design and implement a microservices architecture for an e-commerce platform with MongoDB as the database. The system should have separate services for user authentication, product catalog, shopping cart, and order processing.\n\nRequirements:\n- Implement service discovery and a gateway API\n- Design proper data models for MongoDB with appropriate relationships\n- Implement event-driven communication between services\n- Handle distributed transactions and eventual consistency\n- Implement proper error handling and retry mechanisms',
        difficulty: 'Expert',
        category: 'MongoDB',
        starterCode: '// This is a system design problem\n// Start with defining the microservices architecture\n// and data models for MongoDB\n\n// User Service - MongoDB Schema\n',
        testCases: [
            {
                input: JSON.stringify("architecture"),
                output: JSON.stringify("Describes a proper microservices architecture with clear boundaries")
            },
            {
                input: JSON.stringify("data models"),
                output: JSON.stringify("MongoDB schemas are properly designed with appropriate relationships")
            }
        ],
        solution: '// System Architecture Overview\n\n// 1. API Gateway\n// - Routes requests to appropriate microservices\n// - Handles authentication verification\n// - Rate limiting and request validation\n\n// 2. User Service\n// - User registration, authentication, profile management\n// - JWT token issuance and validation\n\n// 3. Product Service\n// - Product catalog management\n// - Search and filtering capabilities\n// - Inventory tracking\n\n// 4. Cart Service\n// - Shopping cart management\n// - Price calculation\n// - Product availability checks\n\n// 5. Order Service\n// - Order processing and management\n// - Payment integration\n// - Shipping status tracking\n\n// 6. Event Bus\n// - RabbitMQ or Kafka for event-driven communication\n// - Ensures eventual consistency between services\n\n// MongoDB Data Models\n\n// User Service - Schema\nconst mongoose = require("mongoose");\n\nconst userSchema = new mongoose.Schema({\n  email: { \n    type: String, \n    required: true, \n    unique: true, \n    match: /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/ \n  },\n  password: { \n    type: String, \n    required: true,\n    minLength: 8,\n    select: false \n  },\n  name: { \n    type: String, \n    required: true \n  },\n  role: { \n    type: String, \n    enum: ["user", "admin"], \n    default: "user" \n  },\n  addresses: [{\n    street: String,\n    city: String,\n    state: String,\n    zipCode: String,\n    country: String,\n    isDefault: Boolean\n  }],\n  createdAt: { \n    type: Date, \n    default: Date.now \n  },\n  updatedAt: { \n    type: Date, \n    default: Date.now \n  }\n});\n\n// Product Service - Schema\nconst productSchema = new mongoose.Schema({\n  name: { \n    type: String, \n    required: true, \n    index: true \n  },\n  description: { \n    type: String, \n    required: true \n  },\n  price: { \n    type: Number, \n    required: true, \n    min: 0 \n  },\n  category: { \n    type: String, \n    required: true, \n    index: true \n  },\n  inventory: { \n    type: Number, \n    required: true, \n    min: 0 \n  },\n  images: [String],\n  attributes: { \n    type: Map, \n    of: String \n  },\n  isActive: { \n    type: Boolean, \n    default: true \n  },\n  createdAt: { \n    type: Date, \n    default: Date.now \n  },\n  updatedAt: { \n    type: Date, \n    default: Date.now \n  }\n});\n\n// Cart Service - Schema\nconst cartSchema = new mongoose.Schema({\n  userId: { \n    type: String, \n    required: true, \n    index: true \n  },\n  items: [{\n    productId: { \n      type: String, \n      required: true \n    },\n    quantity: { \n      type: Number, \n      required: true, \n      min: 1 \n    },\n    price: { \n      type: Number, \n      required: true \n    }\n  }],\n  totalPrice: { \n    type: Number, \n    default: 0 \n  },\n  createdAt: { \n    type: Date, \n    default: Date.now \n  },\n  updatedAt: { \n    type: Date, \n    default: Date.now \n  }\n});\n\n// Order Service - Schema\nconst orderSchema = new mongoose.Schema({\n  userId: { \n    type: String, \n    required: true, \n    index: true \n  },\n  items: [{\n    productId: { \n      type: String, \n      required: true \n    },\n    quantity: { \n      type: Number, \n      required: true, \n      min: 1 \n    },\n    price: { \n      type: Number, \n      required: true \n    }\n  }],\n  totalPrice: { \n    type: Number, \n    required: true \n  },\n  shippingAddress: {\n    street: String,\n    city: String,\n    state: String,\n    zipCode: String,\n    country: String\n  },\n  paymentStatus: { \n    type: String, \n    enum: ["pending", "completed", "failed"], \n    default: "pending" \n  },\n  paymentId: String,\n  orderStatus: { \n    type: String, \n    enum: ["created", "processing", "shipped", "delivered", "cancelled"], \n    default: "created" \n  },\n  createdAt: { \n    type: Date, \n    default: Date.now \n  },\n  updatedAt: { \n    type: Date, \n    default: Date.now \n  }\n});\n\n// Event Schema - For tracking distributed transactions\nconst eventSchema = new mongoose.Schema({\n  type: { \n    type: String, \n    required: true \n  },\n  producer: { \n    type: String, \n    required: true \n  },\n  payload: { \n    type: Object, \n    required: true \n  },\n  status: { \n    type: String, \n    enum: ["pending", "processed", "failed"], \n    default: "pending" \n  },\n  retryCount: { \n    type: Number, \n    default: 0 \n  },\n  createdAt: { \n    type: Date, \n    default: Date.now \n  },\n  processedAt: Date\n});\n\n// This architecture ensures:\n// 1. Service isolation and independent scaling\n// 2. Eventual consistency through event-driven communication\n// 3. Proper data modeling for MongoDB\n// 4. Handling of distributed transactions',
        points: 100
    }
];

// Admin user to create
const admin = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',  // Will be hashed
    role: 'admin',
};

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Problem.deleteMany({});

        // Check if admin user exists
        let adminUser = await User.findOne({ email: admin.email });

        // Create admin user if doesn't exist
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(admin.password, salt);

            adminUser = await User.create({
                name: admin.name,
                email: admin.email,
                password: hashedPassword,
                role: admin.role,
            });

            console.log('Admin user created:', adminUser.email);
        } else {
            console.log('Admin user already exists:', adminUser.email);
        }

        // Add problems with reference to admin user
        for (const problem of problems) {
            await Problem.create({
                ...problem,
                createdBy: adminUser._id,
            });
        }

        console.log(`${problems.length} problems seeded successfully`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase(); 