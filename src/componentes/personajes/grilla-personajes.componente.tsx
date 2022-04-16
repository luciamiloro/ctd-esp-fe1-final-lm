import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import {IRootState} from "../../store/store"
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import React, {FC} from 'react'

export const useSelector: TypedUseSelectorHook<IRootState> =useReduxSelector
/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * @returns un JSX element 
 */
const GrillaPersonajes:FC = ():JSX.Element => {

    const {personajes, status} = useSelector(state => state.personajes);

    if (status === "CARGANDO") return <div>Cargando personajes...</div>
    if (!personajes || personajes.length === 0) return <></>

    return <div className="grilla-personajes">
        {personajes.map((personaje)=> {
            return (
                <TarjetaPersonaje
                    name= {personaje.name}
                    image= {personaje.image}
                    id= {personaje.id}
                 />
            )
        })}
       

    </div>
}
 
export default GrillaPersonajes;