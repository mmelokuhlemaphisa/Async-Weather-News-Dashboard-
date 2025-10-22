<img src="https://socialify.git.ci/mmelokuhlemaphisa/Async-Weather-News-Dashboard-/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Async-Weather-News-Dashboard-" width="640" height="320" />

---

### 🌦️ Async Weather & News Dashboard

---

## 🧩 Project Overview

The **Async Weather & News Dashboard** is a Node.js + TypeScript application that demonstrates how asynchronous programming works in JavaScript.  
It fetches **real-time weather data** and **news headlines** from two public APIs using **Callbacks**, **Promises**, and **Async/Await**.

The project showcases how to handle asynchronous operations effectively and demonstrates:
- Callbacks (traditional asynchronous style)
- Promises (chaining & error handling)
- Async/Await (modern, cleaner syntax)
- `Promise.all()` and `Promise.race()` usage

---


## 🚀 Features

✅ Fetch weather data from [Open-Meteo API](https://api.open-meteo.com/)  
✅ Fetch news headlines from [DummyJSON Posts API](https://dummyjson.com/posts)  
✅ Callback-based implementation (`callbackVersion.ts`)  
✅ Promise-based implementation (`promiseVersion.ts`)  
✅ Async/Await implementation (`asyncAwaitVersion.ts`)  
✅ Demonstrates `Promise.all()` and `Promise.race()`  
✅ Graceful error handling with `try...catch`  
✅ Clean and well-documented code

---


## 🏗️ Project Structure

```

Async-Weather-News-Dashboard/
│
├── src/
│   ├── callbackVersion.ts
│   ├── promiseVersion.ts
│   ├── asyncAwaitVersion.ts
│
├── package.json
├── tsconfig.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

* Open your preferred terminal (e.g., VS Code Terminal, Command Prompt, PowerShell, macOS Terminal, or Linux shell).

* Clone the repository by running the command below:

* git clone https://github.com/mmelokuhlemaphisa/Async-Weather-News-Dashboard-
* Navigate into the project folder:



### 2. Install Dependencies

* npm install

### 3. Run Each Version

* Run the callback version:

    * npm run callback


* Run the promise version:
   * npm run promise

* Run the async/await version:
    * npm run async




---

## 🧩 Example Scripts (package.json)


"scripts": {

  "callback": "ts-node src/CallbackVersion.ts",
  
  "promise": "ts-node src/PromiseVersion.ts",
  
  "async": "ts-node src/AsyncAwaitVersion.ts"
  
}

---

## 🧪 Testing

1. Run each version separately using the npm scripts above.
2. Observe the output in your terminal.
3. Compare how each asynchronous style handles the same task differently.

---

## ⚠️ Error Handling

* Each version includes error handling.
* The `try...catch` block is used in the async/await version.
* Any network or API error will display a readable message in the console.

---

## 📘 Learning Outcomes

By completing this project

* learn to Use **Callbacks**, **Promises**, and **Async/Await** effectively.
* Handle API requests and errors gracefully.
* Use `Promise.all()` to run tasks in parallel.
* Use `Promise.race()` to get the fastest response.

---

## 🌍 APIs Used

* **Weather API:** [Open-Meteo](https://open-meteo.com/)
* **News API:** [DummyJSON Posts](https://dummyjson.com/posts)

---

## 👨‍💻 Author

**Melokuhle Maphisa**
🧑‍💻 Project: Async Weather & News Dashboard

---


