# Dev Events App

A lightweight **developer events discovery application** built with **Next.js 16**. This project was intentionally kept small and focused, with the primary goal of exploring and validating **new Next.js features**—particularly **server-side pre-rendering** and **cached components**—while maintaining a clean, production-oriented architecture.

🔗 **Live Demo:** [https://dev-events-app-gold.vercel.app/](https://dev-events-app-gold.vercel.app/)

---

## 📌 Project Motivation

The Dev Events App was built as an **experimental learning project**, not a feature-heavy product.

Key motivations:

* Explore **Next.js 16 server-first paradigms**
* Understand **server-side pre-rendering** in real-world scenarios
* Experiment with **cached components** and data-fetching strategies
* Design a clean, scalable structure using **TypeScript**
* Integrate lightweight analytics without compromising performance

This project prioritizes **clarity, performance, and modern patterns** over breadth of functionality.

---

## 🧠 What the App Does

The application allows users to:

* Browse curated **developer-focused events** (conferences, meetups, cloud events, etc.)
* View event metadata such as title, description, and overview
* Experience fast initial loads via server-side pre-rendering

The UI is intentionally minimal, allowing the focus to remain on **data flow, rendering strategy, and architecture** rather than visual complexity.

---

## 🏗️ Architecture Overview

The app is built using a **server-centric Next.js architecture**:

* **Server Components by default** for data fetching and rendering
* Selective use of **Client Components** only where interactivity is required
* Data fetched on the server and **cached to minimize recomputation**
* Clean separation between:

  * UI components
  * Data access logic
  * API routes

This structure mirrors how modern Next.js apps are expected to scale in production.

---

## ⚙️ Tech Stack

### Core Framework

* **Next.js 16**

  * App Router
  * Server Components
  * Server-side pre-rendering
  * Cached Components

### Language & Tooling

* **TypeScript** – strict typing for maintainability and clarity

### Database

* **MongoDB**

  * Used to persist event data
  * Accessed via server-side data-fetching logic

### Analytics

* **PostHog**

  * Lightweight product analytics
  * Used to understand user interactions and page views

### Deployment

* **Vercel**

  * Native Next.js deployment
  * Optimized for server rendering and caching

---

## 🚀 Key Features Explored

### 1. Server-Side Pre-rendering

Pages are rendered on the server ahead of time, enabling:

* Faster Time-to-First-Byte (TTFB)
* Better SEO by default
* Reduced client-side JavaScript execution

This project demonstrates how pre-rendering can be applied even in apps backed by dynamic data.

---

### 2. Cached Components

The app experiments with **Next.js caching primitives** to:

* Avoid redundant database queries
* Ensure consistent data across renders
* Improve performance without manual memoization

Caching is applied at the **component and data-fetching level**, aligning with Next.js 16’s recommended patterns.

---

### 3. Server-First Data Fetching

All data fetching is handled on the server:

* API routes interact with MongoDB
* Components consume data directly without client-side fetching libraries
* Reduced bundle size and improved runtime performance

---

## 📁 Project Structure (High-Level)

```text
app/
├── page.tsx            # Server-rendered home page
├── api/                # API routes for events
components/             # Reusable UI components
lib/                    # Utilities and constants
database/               # MongoDB models and access logic
```

The structure is intentionally simple to keep the focus on **rendering behavior and data flow**.

---

## 📊 Analytics with PostHog

PostHog is integrated to track:

* Page views
* Basic user navigation patterns

Analytics were added carefully to avoid degrading performance or interfering with server rendering.

---

## 🎯 Outcomes & Learnings

Through this project, I:

* Gained hands-on experience with **Next.js 16 server features**
* Developed a clearer mental model of **cached components**
* Reinforced best practices around **server-side data fetching**
* Built a deployable, production-style app with minimal overhead

This app serves as a **reference project** for future Next.js applications using modern patterns.

---

## 🔮 Possible Future Improvements

* Event filtering and categorization
* Pagination or infinite scrolling
* Admin interface for managing events
* Enhanced analytics dashboards
* Authentication and user-specific features

These were intentionally deferred to keep the project focused.

---

## 🧩 Conclusion

The Dev Events App is a compact but deliberate exploration of **modern Next.js development**. Rather than solving many problems, it solves a few **very intentionally**, making it a solid foundation for deeper experimentation or future expansion.

If your goal is to understand **how Next.js 16 wants you to build applications**, this project reflects that mindset clearly.
