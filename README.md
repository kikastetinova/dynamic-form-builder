# Business Day Counter App

This application is a Business Day Counter built with React, TypeScript, and Vite. It allows users to calculate the number of weekdays and business days between two dates, including the option to apply custom holiday rules.

## Features

- **Weekday Calculation**: Calculates the number of weekdays between the selected dates.
- **Business Day Calculation**: Calculates the number of business days between the selected dates, considering holidays.
- **Custom Holiday Rules**: Allows for custom holiday rules to be applied in the business day calculation.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone kikastetinova/design-business-days-counter-app
   cd design-business-days-counter-app
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

### Testing

Tests are implemented in ViteTest
To run tests:

```sh
npm run test
```

# Notes

The solution could be further improved by:

1.  better configs for eslint and prettier and vite
2.  extracting all config files into a separate folder
3.  including tests for the main.tsx file and files for example component
4.  nicer UI of the example component
5.  more suitable datepicker library, if used for commercial use
6.  tailwind custom theme
7.  Github actions setup
