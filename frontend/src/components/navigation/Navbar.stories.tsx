import type { Meta, StoryObj } from '@storybook/react';
import {Navigationbar, NavigationbarProps } from "./Navbar";
import {reactRouterParameters, withRouter} from "storybook-addon-react-router-v6";
import { Provider } from "react-redux";
import {store} from "../../store/store";

const meta = {
  component: Navigationbar,
  decorators: [withRouter, (Story) => <Provider store={store}><Story /></Provider>],

  parameters: {
    reactRouter: reactRouterParameters({
      location: {

      },
      routing: {
        path:  '/'
      }
    })
  }
} satisfies Meta<typeof Navigationbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    setShowSearch: undefined
  },
};

