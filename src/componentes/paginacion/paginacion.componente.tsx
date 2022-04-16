import './paginacion.css';
import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch } from 'react-redux';
import {IRootState} from "../../store/store"
import {cambiarPaginaThunk} from "../../actions/personajesActions"


export const useSelector: TypedUseSelectorHook<IRootState> =useReduxSelector
/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * @returns un JSX element 
 */
const Paginacion = ():JSX.Element => {

    const{apiInfo} = useSelector((state)=> state.personajes)
    const dispatch= useDispatch();
    //const prevPage = ()=> dispatch (cambiarPaginaThunk()); // ('')
    //const nextPage = ()=> fetch(apiInfo.next);

    const prev= apiInfo.prev// null o ?page=2
    const prevContent = prev === null? "undefined":((prev.split('?'))[1]) //! nunca va a pasar porque esta disabled
    const prevPage = ()=>dispatch(cambiarPaginaThunk(prevContent));

    const next= apiInfo.next// null o ?page=2
    const nextContent = next === null? "undefined":((next.split('?'))[1]) //!
    const nextPage = ()=>dispatch(cambiarPaginaThunk(nextContent)); 

/*     console.log(apiInfo.prev)// null 
    console.log(apiInfo.prev) // ?page=2 */

    return <div className="paginacion">
        <button disabled={prev === null? true:false} onClick={prevPage} className={"primary"}>Anterior</button> 
        <button disabled={next === null? true:false} onClick={nextPage} className={"primary"}>Siguiente</button>
    </div>
}

export default Paginacion;