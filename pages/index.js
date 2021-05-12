import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Searchbar from '../components/searchbar/searchbar';

export default function Home() 
{
  function submitHandler(e)
  {
    const input = document.querySelector('input');
    if(input.value != "")
      window.location.href = `/player/${input.value}`;
    else
    window.location.reload()
  }
  return (
    <div className={styles.container}>
      
      <Head>
        <title>Chess Checker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      {/*Seccion de animacion*/}
      <div className={styles.imagesWrapper}>
        <Image className={styles.pb} src="/images/peonN 1.png" width={200} height={200} alt="pawn"></Image>
        <Image className={styles.pw} src="/images/peonB 1.png" width={200} height={200} alt="pawn"></Image>
      </div>
      <h1 className={styles.title}>
        Chess Checker
      </h1>
      {/*Ingreso de nombre de usuario*/}
      <Searchbar submit={submitHandler}/>
      </main>

      {/*Seccion de pie de pagina*/}
      <footer>
        
      </footer>
    </div>
  )
}