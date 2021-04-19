import styles from './navbar.module.scss';
import utilsStyles from '../../styles/utils.module.scss';
import homeStyles from '../../styles/home.module.scss';
import Link from 'next/link';
export default function Navbar(props) 
{
    function submitHandler()
    {
        const input = document.querySelector('input');
        window.location.href = `/player/${input.value}`
    }
    return (
    <div className={styles.navWrapper}>
        <ul className={styles.navList}>
            <li style={{backgroundColor: 'white', borderRadius:"20px", height:'3rem'}} className={[homeStyles.form, styles.listItem ].join(' ')}>
                <input style={{color: 'black'}} className={homeStyles.username} type="text" name="" id=""/>
                <button className={homeStyles.submit} onClick={submitHandler}>Search</button>
            </li>
            <li  className={utilsStyles.heading2Xl}>
                <Link href="/"> 
                    <a className={styles.title}>ChessChecker</a>
                </Link>
            </li>
        </ul>
    </div>)
}