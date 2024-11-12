# Tree Match App

This is Tree Match App built with React, TypeScript, and Vite. It renders a questionarie and displays a match based on user's answers.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone kikastetinova/treematch
   cd treematch
   ```

2. Install dependencies:

   ```sh
   npm i
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.


# Notes

The solution could be further improved to be more production-ready by:

1.  better configs for eslint and prettier and vite
2.  extracting all config files into a separate folder
3.  including unit and e2e tests
5.  using a library for data fetching, e.g. tanstack-query for query caching or fetch retry
6.  improving UX by displaying a fallback component (e.g. a skeleton question component) before the initial question is loaded.
7.  adding aria labels to buttons for better accessibility
8.  lazy loading non-essential components, in our case MatchPage would be a candidate for that
9.  using ErrorBoundary component for better error catching
10. expose the application as a micro-frontend using module federation to use it as part of a larger app
11. creating better UI components, e.g. the button in <MatchPage> and button in <AnswerOption> have the same styling, but aren't extracted to a separate component. Another alternative would be using a component-based UI library, such as MUI or Boostrap5 or daisyUI.
12. improving UX by displaying a progress bar- that's isn't possible with the provided API as we don't know total number of questions
13. storing user progress between page reloads, right now the progress resets of page reload





