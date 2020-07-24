import React, { useState } from 'react';
import {Route, Switch} from "react-router-dom";
import PokemonDetails from "./PokemonDetails/PokemonDetails";

export default function PokemonScreen() {


    return (
        <div className="pokedex__screen">
            <Switch>
                <Route path="/pokemon/:pokemonSlug">
                    <PokemonDetails />
                </Route>
            </Switch>
        </div>
    );
}
