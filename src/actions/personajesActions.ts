
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
    name: string
}

export interface BuscarPersonajesExitoAction extends Action{
    type: "BUSCAR_PERSONAJES_EXITO",
    data: buscarPersonajeParams
}

export interface BuscarPersonajesErrorAction extends Action{
    type: "BUSCAR_PERSONAJES_ERROR",
    error: string
}

export interface CambiarPaginaExitoAction extends Action{
    type: "CAMBIAR_PAGINA_EXITO"
}

//creamos type que incluye atodas las interfaces anteriores
export type PersonajesAction = BuscarPersonajesAction | BuscarPersonajesExitoAction | BuscarPersonajesErrorAction |  CambiarPaginaExitoAction;

//ThunkAction genericos
//1- corresponde al tipo que devuelve la funcion
//2- el tipo del estado global q fue definido en el Store. contiene el combineReducers
//3- argumentos extras. Solo le ponemos unknow en este caso
//4- tipo de las acciones q queremos q se ejecuten de forma diferida

interface BuscarPersonajesThunkAction extends ThunkAction<void, IRootState, unknown, PersonajesAction>{};

//TODO: interface buscarPersonajeParams

export const buscarPersonajes:ActionCreator<BuscarPersonajesAction> = (name:string) => {
    return {
        type: "BUSCAR_PERSONAJES",
        name: name 
    }
}

export const buscarPersonajesExito:ActionCreator<BuscarPersonajesExitoAction> = (data:buscarPersonajeParams) => {
    return {
        type: "BUSCAR_PERSONAJES_EXITO",
        data: data
    }
}

export const buscarPersonajesError:ActionCreator<BuscarPersonajesErrorAction> = (error: string) => {
    return {
        type: "BUSCAR_PERSONAJES_ERROR",
        error: error
    }
}

export const cambiarPaginaExito: ActionCreator<CambiarPaginaExitoAction> = () => {
    return {
        type: "CAMBIAR_PAGINA_EXITO"
    }
}

const MIN_CARACTERES = 3;

export const buscarPersonajesThunk = (name?: string): BuscarPersonajesThunkAction => {
    return async (dispatch) => {
        //if (name.length < MIN_CARACTERES) return null;
        if(name && name.length < MIN_CARACTERES) {return null};
        dispatch(buscarPersonajes(name));
        try{
            const personajes = await buscarPersonajeAPI(name);
            dispatch(buscarPersonajesExito(personajes));
        } catch(e){
            dispatch(buscarPersonajesError(e));
        }
    }
}

export const cambiarPaginaThunk= (pagina: string): BuscarPersonajesThunkAction => {
    return async (dispatch) => {
         
        if(pagina === "undefined"){return cambiarPaginaExito()} //! al pedo
        try{
            const dataPage = await buscarPersonajeAPI(pagina);
            dispatch(buscarPersonajesExito(dataPage));
        } catch(e){
            dispatch(buscarPersonajesError(e));
        }
    }
}