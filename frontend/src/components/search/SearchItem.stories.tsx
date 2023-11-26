import type { Meta, StoryObj } from '@storybook/react';
import {reactRouterParameters, withRouter} from "storybook-addon-react-router-v6";
import { Provider } from "react-redux";
import {store} from "../../store/store";
import {SearchItem} from "./SearchItem";
import {FeatureMemberItemIFace} from "../../types";
import React from "react";
import {MarkerIFace} from "../map";

const meta = {
  component: SearchItem,
  decorators: [
    withRouter,
    (Story) => <Provider store={store}><Story /></Provider>,
    (Story) => <div style={{maxWidth: '20rem'}}><Story /></div>
  ],

  parameters: {
    reactRouter: reactRouterParameters({
      location: {

      },
      routing: {
        path:  '/'
      }
    })
  }
} satisfies Meta<typeof SearchItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const item: FeatureMemberItemIFace = {
  GeoObject: {
    Point: {
      pos: "73.368221 54.989347"
    },
    name: 'Омск',
    description: 'Россия'
  },
  latlng: {
    lat: 55,
    lng: 50
  }
}

const item2: FeatureMemberItemIFace = {
  GeoObject: {
    Point: {
      pos: "73.368221 54.989347"
    },
    name: 'Москва',
    description: 'Россия'
  },
  latlng: {
    lat: 55,
    lng: 50
  }
}

export const Primary: Story = {
  argTypes: {
    item: {
      options: [item, item2],
      control: { type: 'object'}
    }
  },
  args: {
    item: item,
    setShowSearch: () => alert('Отправлен запрос на добавление в историю'),
    setMarkerList: () => alert('Добавлен новый маркер в хранилище'),
    query: 'Омск'
  },
};

