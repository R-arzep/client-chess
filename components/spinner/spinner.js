import styles from './spinner.module.scss';
import Navbar from '../navbar/navbar'
export default function Spinner()
{
    return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.main}>
            Wait a minute...
        </div>
    </div>);
}