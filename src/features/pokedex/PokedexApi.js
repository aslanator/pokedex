import { createSlice } from '@reduxjs/toolkit';

function getUrl(path){
    return `https://pokeapi.co/api/v2/${path}`;
}

export const counterPokedex = createSlice({
    name: 'pokedex',
    initialState: {
        pokemons: [],
    },
    reducers: {
        setPokemons(state, {payload}){
            state.pokemons = payload;
        }
    },
});

export const { setPokemons } = counterPokedex.actions;


export const loadPokemons = () => async dispatch => {
    try{
        const url = getUrl('pokemon/?limit=10000');
        const body = await fetch(url);
        const data = await body.json();
        const pokemons = data.results;
        dispatch(setPokemons(pokemons));
    }
    catch (e){
        console.error(e);
    }
};


export const getPokemons = state => state.pokedex.pokemons;

export default counterPokedex.reducer;
