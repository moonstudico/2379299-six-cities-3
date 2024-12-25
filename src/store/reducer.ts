import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, loadOffers, requireAuthorization, setError } from './action';
// import { offers } from '../ mocks/offers';
import { AuthorizationStatus } from '../components/const';
import { Offers } from '../types/offer';


type InitialState = {
  currentCity: string;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity,(state, action) => {
      const{currentCity} = action.payload;
      state.currentCity = currentCity;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });

});


export {reducer};
