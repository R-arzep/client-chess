import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/navbar/navbar';
import styles from '../../styles/dashboard.module.scss';
import {useState, useEffect} from 'react';
import Stats from '../../components/stats/stats';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Spinner from '../../components/spinner/spinner';
import Home from '..';

const getData = async (...url) => 
{
    try 
    {
      const playerRes = await fetch(url[0]);
      const playerData = await playerRes.json();
      if(playerData.code === 0) return 'error';
      const statsRes = await fetch(url[1]);
      const statsData = await statsRes.json();
      return {...playerData, ...statsData}  
    } catch (err) 
    {
      console.log(err);
      return 'error';  
    }
};
function Dashboard(props) 
{
  try 
  {
    function changeStat(e)
    {
      const mode = e.target.textContent.toLowerCase();
      setstate(mode);
    }
  const router = useRouter()
  const { data, error } = useSWR([`https://api.chess.com/pub/player/${router.query.userDash}`,`https://api.chess.com/pub/player/${router.query.userDash}/stats`],getData);
  const modes = ['Bullet','Blitz','Rapid','Daily'];
  const regexMode = /chess_.*/gi;
  const [state, setstate] = useState('blitz');
  if (error || data == 'error') 
  {
    alert("Error, No existe usuario");
    return <Home/>
  }
  if (!data) return <Spinner />
  console.log(data);
  const stringData = Object.keys(data);
  // render data
  
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
              <li className={styles.username}>{data.username.toUpperCase()}</li>
              {data.hasOwnProperty('name')?<li>{data.name}</li>:''}
              <li>{data.hasOwnProperty('title')?`Title: ${data.title} /`:""} {"Country: "+ data.country.substring(data.country.lastIndexOf('/')+1)}</li>
              <li>Followers: {data.followers}</li>
            </ul>

          </div>
          <div className={styles.menuBar}>
           <ul id="modes" className={styles.optionWrapper}>
              {modes.map( mode => 
                {
                  
                  if(data.hasOwnProperty(`chess_${mode.toLowerCase()}`)){return <li key={mode} onClick={changeStat} className={styles.optionItem}><img className={styles.icon} src={`/images/${mode}.svg`}/>{mode}</li>}
                  else ""
                })
              }
           </ul> 
          </div>
        </header>
        {regexMode.test(stringData)?
        <div className={styles.statsWrapper}>
          <div className={styles.titleWrapper}>
              <img className={styles.iconTitle} src={`/images/${state}.svg`}/>        
              <h1 className={styles.title}>{state.toUpperCase()}</h1>
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.best}>
                <h2>Best Game</h2>
                <h3>Date: {new Date(data[`chess_${state}`].best.date*1000).toDateString()}</h3>
                <h3>Click to look player's <a href={data[`chess_${state}`].best.game} target="_blank"> best game</a>!</h3>
                <h3>Rating: {data[`chess_${state}`].best.rating}</h3>
            </div>
            <div className={styles.last}>
                <h2>Last Game</h2>
                <h3>Date: { new Date(data[`chess_${state}`].last.date*1000).toDateString()}</h3>
                <h3>Rating: {data[`chess_${state}`].last.rating}</h3>
                <h3>Rating Power between: {data[`chess_${state}`].last.rating - data[`chess_${state}`].last.rd * 2} - {data[`chess_${state}`].last.rating + data[`chess_${state}`].last.rd * 2}</h3>
            </div>
            <div className={styles.record}>
                <h2>Games Record</h2>
                <h3>Wins: { data[`chess_${state}`].record.win}</h3>
                <h3>Draws: {data[`chess_${state}`].record.draw}</h3>
                <h3>Losses: {data[`chess_${state}`].record.loss}</h3>
            </div>
          </div>
      </div>:<div className={styles.notFound}>The player don't have any game registered</div>
      }
    </div>
  )  
  } catch (e) 
  {
    return <Dashboard/>;  
  }
}

// This gets called on every request

export default Dashboard;