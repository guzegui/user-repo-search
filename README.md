# GitHub Explorer

This project is a React application that allows users to search for GitHub users and view their public repositories. It provides different visualization modes for the repositories, including a list, cards, and a hierarchical tree diagram grouped by programming language. The application interacts with the GitHub GraphQL API to fetch user and repository data.

## How to Run the Project

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up GitHub Personal Access Token (PAT):**
    The application uses the GitHub GraphQL API, which requires authentication. You need to create a `.env` file in the root of the project and add your GitHub Personal Access Token:

    ```
    VITE_GITHUB_PAT=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
    ```
    You can generate a PAT from your GitHub Developer Settings (ensure it has `public_repo` scope for public repositories).

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually accessible at `http://localhost:5173`. The application will automatically open in your browser.

## How to Run the Test Suite

The project uses Vitest for its testing suite. To run the tests, use the following command:

```bash
npm test
```
This command will execute all tests and report the results in your terminal.

## Future Improvements

*   Implement pagination for repositories to handle users with a large number of repos.
*   Add more detailed repository information (e.g., issues, pull requests).
*   Enhance filtering and sorting options for repositories.
*   Improve error handling and user feedback in the UI.
*   Add support for light/dark theme toggling.
*   Allow searching for organizations in addition to individual users.
*   Implement repository search functionality within a user's profile.
