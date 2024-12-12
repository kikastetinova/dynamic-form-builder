# Dynamic Form Builder

This is Dynamic Form Builder App built with React, TypeScript, and Vite. 
It renders a form based on a provided config and validates its fields on form submit.

## Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone kikastetinova/dynamic-form-builder
   cd dynamic-form-builder
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
4.  using a library for validation schema instead of creating a custom validation logic
5.  using context to pass down useFormBuilder methods to deeply nested components
6.  expose the application as a micro-frontend using module federation to use it as part of a larger app




