import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import Personaje from "../../types/personaje.types";
import { useSelector } from "./grilla-personajes.componente"; //! probar con react-redux
import { agregarFavorito, sacarFavorito} from "../../actions/personajesfavoritosActions"
import { useDispatch } from "react-redux";

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * @returns un JSX element 
 */
interface tarjetaProps {
    name: string,
    image: string,
    id: number,
}

const TarjetaPersonaje = ({name, image, id}:tarjetaProps):JSX.Element => {

    const dispatch = useDispatch();

    const favoritos = useSelector((state) => state.personajesFavoritos.favoritos);
    let esFavorito = favoritos.some((favorito) => favorito.id === id); 

    const handleClick = () => {
        if (!esFavorito){
            dispatch(agregarFavorito({id, name, image}));
        } else {
            dispatch(sacarFavorito({id, name, image}));
        }
    };

    return <div className="tarjeta-personaje" key={"personaje_"+ id}>
        <img src={image} alt={name} />
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
             <BotonFavorito esFavorito={esFavorito} onClick={handleClick} /> {/* //TODO */}
        </div>
    </div>
}

export default TarjetaPersonaje;