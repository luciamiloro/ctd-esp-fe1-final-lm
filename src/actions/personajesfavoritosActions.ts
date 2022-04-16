
import {Action, ActionCreator} from "@reduxjs/toolkit";
import { IRootState } from "../store/store"; 
import Personaje from "../types/personaje.types";

//crea
export interface PersonajesFavoritos extends Action{
    type: "ES_FAVORITO",
    favorito: boolean
}