import React, { useState } from 'react';
import {PokemonListScreen} from "./PokedexListScreen/PokemonListScreen";

export function PokedexRight() {


    return (
        <div className="pokedex__right">
            <PokemonListScreen />
            <div className="pokedex__right-buttons">
                <button className="pokedex__prev pokedex__button">PREV</button>
                <button className="pokedex__next pokedex__button">NEXT</button>
            </div>
        </div>
    );
}
