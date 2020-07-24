import React, { useState } from 'react';
import PokemonScreen from "./PokemonScreen/PokemonScreen";

export default function PokedexLeft() {


    return (
        <div className="pokedex__left">
            <div className="pokedex__left-top" />
            <div className="pokedex__left-bender" />
            <PokemonScreen />
        </div>
    );
}
