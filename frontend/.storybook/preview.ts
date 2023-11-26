import type { Preview } from "@storybook/react";
import '../src/index.css'
import '../src/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
