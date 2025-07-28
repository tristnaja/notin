# Notin - AI-Powered Note Generator

**Notin** is a modern, AI-driven web application designed to streamline your note-taking process. This landing page serves as the gateway to a powerful tool that helps students, professionals, and creators generate insightful and organized notes effortlessly.

## ✨ Features

- **Responsive Design:** A clean and modern user interface that works seamlessly across all devices.
- **AI-Powered Generation:** (Coming Soon) Leverage the power of AI to create notes from various inputs.
- **Intuitive Navigation:** Easy-to-use navigation to explore the application's features.

## 🚀 Tech Stack

This project is built with a modern, scalable, and efficient technology stack:

- **Framework:** [Next.js](https://nextjs.org/) 15.4.3 (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Animations:** [Lottie](https://lottiefiles.com/) for engaging animations
- **State Management:** React `useState` for component-level state.

## 🏁 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/notin.git
    cd notin
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Project Structure

The project follows a feature-based structure within the Next.js App Router paradigm.

```
.
├── eslint.config.mjs    # ESLint configuration for code linting.
├── next-env.d.ts        # TypeScript declaration file for Next.js.
├── next.config.ts       # Configuration file for Next.js.
├── node_modules/        # Directory where project dependencies are stored.
├── package-lock.json    # Records the exact versions of project dependencies.
├── package.json         # Lists project dependencies and scripts.
├── postcss.config.mjs   # Configuration for PostCSS (used by Tailwind CSS).
├── public/              # Static assets (images, icons, etc.).
│   ├── landing/         # Assets specific to the landing page.
│   ├── logo-full.svg    # Full version of the project logo.
│   └── logo-short.svg   # Short version of the project logo.
├── README.md            # The main README file for the project.
├── src/                 # Source code for the application.
│   └── app/             # Core of the Next.js App Router.
└── tsconfig.json        # TypeScript compiler configuration.
```

- **`/src/app`**: The core of the application, containing all routes, components, and layouts.
- **`/src/app/components`**: Houses all the individual components like `Navbar`, `Hero`, `Features`, etc.
- **`/public`**: Stores all static files that are publicly accessible.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter to check for code quality issues.

## 🗺️ Roadmap

The future of Notin is exciting! Here's what's planned:

1.  **User Authentication:** Implement a secure sign-in and registration system.
2.  **User Dashboard:** Create a personalized dashboard for users to manage their notes.
3.  **AI Note Generation:** Integrate the core AI functionality to generate notes.
4.  **Database Integration:** Connect a database to store user data and notes.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License.
