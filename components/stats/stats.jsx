import Dashboard from '../../pages/player/[userDash]';
import styles from './stats.module.scss';

function Stats(props)
{
    
    try 
    {
        const playerStats = props.mode;
        return( 
        <div className={styles.statsWrapper}>
            <div className={styles.titleWrapper}>
                <img className={styles.icon} src={`/images/${props.title}.svg`}/>        
                <h1 className={styles.title}>{props.title.toUpperCase()}</h1>
            </div>
            <div className={styles.best}>
                <h2>Best Game</h2>
                <h3>Date: {new Date(playerStats.best.date*1000).toDateString()}</h3>
                <h3>Click to look player's <a href={playerStats.best.game} target="_blank"> best game</a>!</h3>
                <h3>Rating: {playerStats.best.rating}</h3>
            </div>
            <div className={styles.last}>
                <h2>Last Game</h2>
                <h3>Date: { new Date(playerStats.last.date*1000).toDateString()}</h3>
                <h3>Rating: {playerStats.last.rating}</h3>
                <h3>Rating Power between: {playerStats.last.rating - playerStats.last.rd * 2} - {playerStats.last.rating + playerStats.last.rd * 2}</h3>
            </div>
            <div className={styles.record}>
                <h2>Games Record</h2>
                <h3>Wins: { playerStats.record.win}</h3>
                <h3>Draws: {playerStats.record.draw}</h3>
                <h3>Losses: {playerStats.record.loss}</h3>
            </div>
        </div>)
    } catch (error) 
    {
        return <Dashboard/>    
    }
}
export default Stats;