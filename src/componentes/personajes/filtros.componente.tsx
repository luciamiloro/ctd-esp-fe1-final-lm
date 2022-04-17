import './filtros.css';
import {FC, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { buscarPersonajesThunk } from '../../actions/personajesActions';
import {useSelector} from './grilla-personajes.componente';

const Filtros: FC = ():JSX.Element => {

    const dispatch = useDispatch();
    const {busqueda} = useSelector(state => state.personajes)

     useEffect(()=> {
        dispatch(buscarPersonajesThunk());
    }, [])

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input value={busqueda} type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" 
        onChange={(e)=> dispatch(buscarPersonajesThunk(e.target.value))
        } />
    </div>
}


export default Filtros;