import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {getPokemons} from "../../PokedexApi";

export function PokemonListScreen() {
    const pokemons = useSelector(getPokemons);
    const [scrolled, setScrolled] = useState(0);
    const showAmount = 30;
    const showedPokemons = pokemons.slice(scrolled, scrolled + showAmount);
    console.log(showedPokemons);

    function wheel({deltaY}){
        if(deltaY > 0){
            const scr = scrolled + 1 > pokemons.length ? pokemons.length : scrolled + 1;
            setScrolled(scr)
        }
        if(deltaY < 0){
            const scr = scrolled - 1 < 0 ? 0 : scrolled - 1;
            setScrolled(scr)
        }
    }

    return (
        <div className="pokedex__list-screen" onWheel = {(e) => wheel(e)}>
            <ul>
                {showedPokemons.map(pokemon => {
                    return (<li className="pokedex__list-screen-item" key={pokemon.name} >{pokemon.name}</li>)
                })}
            </ul>
        </div>
    );
}
