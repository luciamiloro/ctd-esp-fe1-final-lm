import Personaje from "../types/personaje.types";

export const buscarPersonajeAPI = async (nombre?: string ): Promise<Personaje[]> =>{

    let params = "?"
    if (nombre){   
        if (nombre?.includes('page')) { params+=nombre}
        else{params += `name=${nombre}` }
    }
    
    /* if(nombre){   params += `name=${nombre}` 
    }
    */

    return fetch(`https://rickandmortyapi.com/api/character/${params}`)
    .then(data => data.json())
    .then(data => data) 

}