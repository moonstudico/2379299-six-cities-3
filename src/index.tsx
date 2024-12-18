import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './ mocks/offers';
import { reviews } from './ mocks/reviews';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Props = {
  countOffers: 111,
  offers: offers,
  reviews: reviews
};

root.render(
  <React.StrictMode>
    <App countOffers = {Props.countOffers} offers = {Props.offers} reviews = {Props.reviews}/>
  </React.StrictMode>
);
