
import {Action, ActionCreator, ThunkAction} from "@reduxjs/toolkit";
import { IRootState } from "../store/store"; 
import Personaje from "../types/personaje.types";
import { buscarPersonajeAPI } from "../services/personaje.services"


interface buscarPersonajeParams {
    info:{
        count:number,
        next: string,
        pages: number,
        prev: string
    },
    results: Personaje[]
}

//creacion de interfaces de ts
export interface BuscarPersonajesAction extends Action{
    type: "BUSCAR_PERSONAJES",
}

export interface BuscarPersonajesExitoAction extends Action{
    type: "BUSCAR_PERSONAJES_EXITO",
    data: buscarPersonajeParams
}

export interface BuscarPersonajesErrorAction extends Action{
    type: "BUSCAR_PERSONAJES_ERROR",
    error: string
}

export interface LimpiarFiltroAction extends Action{
    type: "LIMPIAR_FILTRO",
}

export interface FiltrarPersonajesAction extends Action{
    type: "FILTRAR_PERSONAJES",
    name: string
}




//creamos type que incluye atodas las interfaces anteriores
export type PersonajesAction = BuscarPersonajesAction | BuscarPersonajesExitoAction | BuscarPersonajesErrorAction | LimpiarFiltroAction | FiltrarPersonajesAction ;

//ThunkAction genericos
//1- corresponde al tipo que devuelve la funcion
//2- el tipo del estado global q fue definido en el Store. contiene el combineReducers
//3- argumentos extras. Solo le ponemos unknow en este caso
//4- tipo de las acciones q queremos q se ejecuten de forma diferida

interface BuscarPersonajesThunkAction extends ThunkAction<void, IRootState, unknown, PersonajesAction>{};

//TODO: interface buscarPersonajeParams

export const buscarPersonajes:ActionCreator<BuscarPersonajesAction> = () => {
    return {
        type: "BUSCAR_PERSONAJES"
    }
}

export const filtrarPersonajes: ActionCreator<FiltrarPersonajesAction> = (name:string) => {
    return {
        type: "FILTRAR_PERSONAJES",
        name: name
    }
}

const buscarPersonajesExito:ActionCreator<BuscarPersonajesExitoAction> = (data:buscarPersonajeParams) => {
    return {
        type: "BUSCAR_PERSONAJES_EXITO",
        data: data
    }
}

const buscarPersonajesError:ActionCreator<BuscarPersonajesErrorAction> = (error: string) => {
    return {
        type: "BUSCAR_PERSONAJES_ERROR",
        error: error
    }
}

export const limpiarFiltro:ActionCreator<LimpiarFiltroAction> = () => {
    return {
        type: "LIMPIAR_FILTRO",
    }
}


const MIN_CARACTERES = 3;
//busca personaje impactando el valor de busqueda
export const buscarPersonajesThunk = (name?: string): BuscarPersonajesThunkAction => {
    return async (dispatch) => {
        if(name && name.length < MIN_CARACTERES) {return null};
        dispatch(buscarPersonajes());
        try{
            const personajes = await buscarPersonajeAPI(name);
            dispatch(buscarPersonajesExito(personajes));
        } catch(e){
            dispatch(buscarPersonajesError(e));
        }
    }
}

