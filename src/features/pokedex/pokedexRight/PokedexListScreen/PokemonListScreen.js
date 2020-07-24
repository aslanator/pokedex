import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {getPokemons} from "../../PokedexApi";
import {Link, useParams} from "react-router-dom";


export default () => {
    const {activePokemon} = useParams();
    const pokemons = useSelector(getPokemons);
    const [scrolled, setScrolled] = useState(0);
    const showAmount = 20;
    const showedPokemons = pokemons.slice(scrolled, scrolled + showAmount);
    const screen = useRef(null);
    const touch = useRef(null);

    const listStyle = {
        height: `${pokemons.length * 40}px`,
        paddingTop: `${scrolled * 40}px`
    };

    const touchStyle = {
        top: `
        ${(screen.current?.scrollTop / screen.current?.querySelector('ul').offsetHeight)
        * (touch.current?.parentNode.offsetHeight - touch.current?.offsetHeight)}px`,
    }

    function wheel({deltaY}) {
        screen.current.scrollBy(0, deltaY);
    }

    function scroll(e) {
        const scroll = screen.current.scrollTop;
        const height = pokemons.length * 40;
        const percent = (scroll / height) * 100;
        const scr = parseInt(scroll / 40);
        setScrolled(scr)
    }

    function scrollBarDown({clientY}) {
        const top = touch.current.offsetTop;
        const cursorTop = clientY;

        function scrollMove({clientY}) {
            let newTop = (clientY - cursorTop) + top;
            const parentHeight = touch.current.parentNode.offsetHeight - touch.current.offsetHeight;
            if (newTop > parentHeight)
                newTop = parentHeight;
            const newPercent = newTop / parentHeight;
            screen.current.scrollTop = screen.current.querySelector('ul').offsetHeight * newPercent;
        }

        function endScrollMove() {
            document.removeEventListener('mousemove', scrollMove)
            document.removeEventListener('mouseup', endScrollMove);
            document.removeEventListener('contextmenu', endScrollMove);
        }

        document.addEventListener('mousemove', scrollMove)
        document.addEventListener('mouseup', endScrollMove);
        document.addEventListener('contextmenu', endScrollMove);
    }

    function scrollDirect({target, currentTarget, clientY}) {
        if (target === currentTarget) {
            const targetY = target.getBoundingClientRect().y;
            const newTop = clientY - targetY - touch.current.offsetHeight;
            const height = touch.current.parentNode.offsetHeight - touch.current.offsetHeight;
            const newPercent = newTop / height;
            screen.current.scrollTop = screen.current.querySelector('ul').offsetHeight * newPercent;
        }
    }

    function getPokemonItemClass(pokemon) {
        let classes = "pokedex__list-screen-item";
        if(pokemon.name === activePokemon)
            classes += ' pokedex__list-screen-item_active';
        return classes;
    }

    return (
        <>
            <div className="pokedex__list-screen-scrollbar" onMouseDown={(e) => scrollDirect(e)}>
                <div ref={touch} style={touchStyle} className="pokedex__list-screen-scrollbar-touch"
                     onMouseDown={(e) => scrollBarDown(e)}
                />
            </div>
            <div ref={screen} className="pokedex__list-screen"
                 onWheel={(e) => wheel(e)}
                 onScroll={(e) => scroll(e)}
            >
                <ul style={listStyle}>
                    {showedPokemons.map(pokemon => {
                        return (<li className={getPokemonItemClass(pokemon)} key={pokemon.name}>
                            <Link
                                to={{
                                    pathname: `/pokemon/${pokemon.name}`,
                                }}
                            >
                                {pokemon.name[0].toUpperCase()}
                                {pokemon.name.slice(1)}
                            </Link>
                        </li>)
                    })}
                </ul>
            </div>
        </>
    );
}
