# 📚 Student Toolbox 🧰

Student Toolbox is a web application designed to make student life easier by organizing their schedule, calculating their grades, and managing the tasks that they need to complete.

## Getting Started 🚀

These instructions will get you a copy of Student Toolbox up and running on your local machine for development and testing purposes.

### Prerequisites ✔️

Install the following software:

1.  **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

- [Download Node.js](https://nodejs.org/en/download/)

- Installation instructions are available on the download page.

- Verify installation with:

```bash
node -v
```

2.  **npm**: Node package manager, included with Node.js.

- Verify installation with:

```bash
npm -v
```

3.  **Git**: A version control system for tracking changes in source code.

- [Download Git](https://git-scm.com/downloads)

- Installation instructions are available on the download page.

- Verify installation with:

```bash
git --version
```

4.  **A modern web browser**: Such as Google Chrome or Mozilla Firefox.

- [Download Google Chrome](https://www.google.com/chrome/)

- [Download Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)

5.  **An Integrated Development Environment (IDE)**: Such as Visual Studio Code.

- [Download Visual Studio Code](https://code.visualstudio.com/)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  **Fork the repository**

2.  **Clone the forked repository**

3.  **Install dependencies:**

```bash
npm install
```

### Running

```bash
npm run  dev
```

## Running the tests

## Connecting to the database

We use a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster to store user data:

1. Contact a team member to get the connection string.
2. Add the connection string to your `.env.local` as `MONGODB_URI=<connection string>`.
3. Modify the `User` schema in `/lib/mongodb/mongodb.js` to specify the data types you want to store.
4. Use the [Mongoose](https://mongoosejs.com/docs/guide.html) API to push changes to the database.
5. Install [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) (CLI) or [MongoDB Compass](https://www.mongodb.com/try/download/compass) (GUI) to inspect database contents.

## Authentication

We use [Auth.js](https://authjs.dev/) to provide authentication and session management:

1. Contact a team member to get the authentication secret
2. Add the secret to your `.env.local` as `AUTH_SECRET=<secret>`.
3. To register a new user, navigate to `/register` and enter a username and password.
4. To sign in, use the button in the sidebar and enter user credentials.

## Deployment

## Built With 🛠️

- [Next.js](https://nextjs.org/) - The React framework used

- [Node.js](https://nodejs.org/) - JavaScript runtime

- [npm](https://www.npmjs.com/) - Dependency Management

## Contributing

Please read (insert contributor guidelines) for details on contributing and (insert code of conduct) for expected behaviour.

## Versioning

We use Git for version control.

## Authors

## License
