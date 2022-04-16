import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface tarjetaProps {
    name: string,
    image: string,
    id: number
}

const TarjetaPersonaje = ({name, image, id}:tarjetaProps):JSX.Element => {

    return <div className="tarjeta-personaje" key={"personaje_"+ id}>
        <img src={image} alt={name} />
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
             <BotonFavorito esFavorito={false} onClick={null} /> {/* //TODO */}
        </div>
    </div>
}

export default TarjetaPersonaje;