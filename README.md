# VsCodeHelp-Assignment
This is a full-stack application with separate frontend and backend repositories. Follow the instructions below to set up and run the application on your local machine for development and testing purposes.

## Prerequisites

Before running the project, you need to have the following installed:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (If you're using a local database)

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the required packages:

```bash
npm install
# or
yarn install
```

3. Set up your environment variables:

Update the `.env` file.

4. Start the backend server:

```bash
npm start
# or
yarn start
```

The backend should now be running on `http://localhost:5000` or the port you specified in the `.env` file.

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the required packages:

```bash
npm install
# or
yarn install
```

3. Start the frontend development server:

```bash
npm run start
# or
yarn start
```

The frontend should now be running on `http://localhost:3000`.

## Deployment

For deploying the application, follow the deployment instructions provided by your hosting service. Ensure that the environment variables are set up correctly in your production environment.
