import React  from 'react';
import PokemonListScreen from "./PokedexListScreen/PokemonListScreen";
import {Switch, Route} from "react-router-dom";


export default function PokedexRight() {

    return (
        <div className="pokedex__right">
            <Switch>
                <Route path="/pokemon/:activePokemon?">
                    <PokemonListScreen />
                    <div className="pokedex__right-buttons">
                        <button className="pokedex__prev pokedex__button">PREV</button>
                        <button className="pokedex__next pokedex__button">NEXT</button>
                    </div>
                </Route>
            </Switch>
        </div>
    );
}
