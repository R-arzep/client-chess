import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import utilStyles from '../styles/utils.module.scss';

export default function Home() 
{
  function submitHandler(e)
  {
    const input = document.querySelector('input');
    e.preventDefault();
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
      <div className={styles.imagesWrapper}>
        <Image className={styles.pb} src="/images/peonN 1.png" width={200} height={200} alt="pawn"></Image>
        <Image className={styles.pw} src="/images/peonB 1.png" width={200} height={200} alt="pawn"></Image>
      </div>
      <h1 className={styles.title}>
        Chess Checker
      </h1>
      
      <form className={styles.form} onSubmit={submitHandler}>
        <input type="text" name="username" className={styles.username}/>
        <input type="submit" value="Search" className={styles.submit}/>
      </form>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}