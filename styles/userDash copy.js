import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar/navbar';
import styles from '../../styles/dashboard.module.scss';
import {useState, useEffect} from 'react';
import Stats from '../components/stats/stats';

function Dashboard({data}) 
{
  const modes = ['Bullet','Blitz','Rapid','Daily'];
  const stringData = Object.keys(data).join(' ');
  const regexMode = /chess_.*/gi;
  const [state, setstate] = useState('blitz');
  const [dataPlayer, setdataPlayer] = useState(data);
  function changeStat(e)
  {
    const mode = e.target.textContent.toLowerCase();
    setstate(mode);
  }
  return (
    <div className={styles.container}>
        <Head>
            <title>Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <header className={styles.header}>
          <div className={styles.dataWrapper}>
            <img src={data.avatar || "https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.84a92436.gif"}/>
            <ul className={styles.textWrapper}>
              <li className={styles.username}>{dataPlayer.username.toUpperCase()}</li>
              {data.hasOwnProperty('name')?<li>{dataPlayer.name}</li>:''}
              <li>{data.hasOwnProperty('title')?`Title: ${dataPlayer.title} /`:""} {"Country: "+ dataPlayer.country.substring(dataPlayer.country.lastIndexOf('/')+1)}</li>
              <li>Followers: {dataPlayer.followers}</li>
            </ul>

          </div>
          <div className={styles.menuBar}>
           <ul id="modes" className={styles.optionWrapper}>
              {modes.map( mode => 
                {
                  
                  if(dataPlayer.hasOwnProperty(`chess_${mode.toLocaleLowerCase()}`)){return <li key={mode} onClick={changeStat} className={styles.optionItem}><img className={styles.icon} src={`/images/${mode}.svg`}/>{mode}</li>}
                  else ""
                })
              }
           </ul> 
          </div>
        </header>
        {regexMode.test(stringData)?<Stats title={state} mode={dataPlayer[`chess_${state}`]}/>:<div className={styles.notFound}>The player don't have any game registered</div>}
    </div>
  )
}
// This gets called on every request
export async function getServerSideProps(context) 
{
  try 
  {
    // Fetch data from external API
    const resInfo = await fetch(` https://api.chess.com/pub/player/${context.params.userDash} `);
    const dataInfo = await resInfo.json();
    const resStat = await fetch(` https://api.chess.com/pub/player/${context.params.userDash}/stats`);
    const dataStat = await resStat.json();
    const data = {...dataInfo,...dataStat};
    if(!data)
    throw error
    // Pass data to the page via props
    return { props: { data } }  
  } catch (err) 
  {
    return { notFound : true}
    console.error(err) 
  }
  
}

export default Dashboard;