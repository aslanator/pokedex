import React, { useState, useEffect } from 'react';
import PokedexLeft from "./pokedexLeft/PokedexLeft";
import PokedexRight from "./pokedexRight/PokedexRight";
import {useDispatch} from "react-redux";
import {loadPokemons} from './PokedexApi';

export function Pokedex() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPokemons());
    }, []);

    return (
        <div className="pokedex">
            <PokedexLeft />
            <PokedexRight />
        </div>
    );
}
