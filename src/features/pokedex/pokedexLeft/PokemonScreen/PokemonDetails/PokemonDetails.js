import React, {useEffect, useState} from 'react';
import {getPokemon, loadPokemon} from "../../../PokedexApi";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import './styles.scss';


export default function PokemonScreen() {
    const {pokemonSlug} = useParams();
    const pokemon =  useSelector(getPokemon);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPokemon(pokemonSlug));
    }, [pokemonSlug]);


    if(pokemon.sprites)
        return (
            <div className="pokedex__details">
                <img src={pokemon.sprites.front_default} alt="pokemon"/>
            </div>
        );
    else if(pokemon.load)
        return (
            <div className="pokedex__details">
               LOADING
            </div>
        )
    return (<div/>);
}
