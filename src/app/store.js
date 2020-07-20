import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokedex/PokedexApi';

export default configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
});
