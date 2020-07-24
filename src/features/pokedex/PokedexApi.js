import { createSlice } from '@reduxjs/toolkit';

function getUrl(path){
    return `https://pokeapi.co/api/v2/${path}`;
}

export const counterPokedex = createSlice({
    name: 'pokedex',
    initialState: {
        pokemons: [],
        pokemon: {},
    },
    reducers: {
        setPokemons(state, {payload}){
            state.pokemons = payload;
        },
        setPokemon(state, {payload}) {
            console.log(payload);
            state.pokemon = payload;
        }
    },
});

export const { setPokemons, setPokemon } = counterPokedex.actions;


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

let controller = new AbortController();
export const loadPokemon = (pokemonSlug) => async dispatch => {
    dispatch(setPokemon({load: true}));
    controller.abort();
    controller = new AbortController();
    const signal = controller.signal;
    try{
        const url = getUrl(`pokemon/${pokemonSlug}`);
        const body = await fetch(url, {signal});
        const pokemon = await body.json();
        dispatch(setPokemon(pokemon));
    }
    catch (e){
        console.error(e);
    }
};


export const getPokemons = state => state.pokedex.pokemons;
export const getPokemon = state => state.pokedex.pokemon;


export default counterPokedex.reducer;
