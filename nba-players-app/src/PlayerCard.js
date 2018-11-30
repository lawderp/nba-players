import React from 'react';
import PropTypes from 'prop-types';

const PlayerCard = props =>
  <div className="playerCard-wrapper">
    <div className="player-header"> 
      <h2>{props.playerName}</h2>
      <h4>2018-2019 Stats</h4>
    </div>

    <div className="season-stats">
      <div className="season-stat GP">
        <p className="season-stat-label">GP</p>
        <p>{props.playerInfo.GP}</p>
      </div>
      <div className="season-stat MIN">
        <p className="season-stat-label">MIN</p>
        <p>{props.playerInfo.MPG}</p>
      </div>
      <div className="season-stat FG">
        <p className="season-stat-label">FG%</p>
        <p>{props.playerInfo.FGP}%</p>
      </div>
      <div className="season-stat 3FG">
        <p className="season-stat-label">3P%</p>
        <p>{props.playerInfo.TFGP}%</p>
      </div>
      <div className="season-stat BLK">
        <p className="season-stat-label">BLK</p>
        <p>{props.playerInfo.BPG}</p>
      </div>
      <div className="season-stat STL">
        <p className="season-stat-label">STL</p>
        <p>{props.playerInfo.SPG}</p>
      </div>
      <div className="season-stat REB">
        <p className="season-stat-label">REB</p>
        <p>{props.playerInfo.RPG}</p>
      </div>
      <div className="season-stat AST">
        <p className="season-stat-label">AST</p>
        <p>{props.playerInfo.APG}</p>
      </div>
      <div className="season-stat PTS">
        <p className="season-stat-label">PTS</p>
        <p>{props.playerInfo.PPG}</p>
      </div>
    </div>
  </div>

  PlayerCard.propTypes = {
    playerName: PropTypes.string,
    playerInfo: PropTypes.object,
  }

export default PlayerCard;