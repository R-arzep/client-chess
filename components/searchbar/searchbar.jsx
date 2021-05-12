import React from 'react';
import styles from './searchbar.module.scss';

const Searchbar = (props) =>
{
    return (
    <div className={styles.form} >
        <input type="text" name="username" className={styles.username}/>
        <div className={styles.buttonsWrapper}>
            {/*Abre un menu para seleccionar la plataforma donde se buscara al usuario */}
            <button className={styles.submit} onClick={ e => {document.querySelector(`.${styles.platforms}`).style = "display: block"} }>chess.com </button>
            <button className={styles.submit} onClick={props.submit}>Search </button>
        </div>
        <div className={styles.platforms}>
            {/*Cierra el menu*/}
            <button  onClick={ e => {document.querySelector(`.${styles.platforms}`).style = "display: none"} }>Close </button>
        </div>
    </div>
    );
}
export default Searchbar;