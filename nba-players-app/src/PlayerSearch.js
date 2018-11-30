import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import PlayerCard from './PlayerCard';


const NBA = require ("nba");


// const curry = NBA.findPlayer('Stephen Curry');
const items = [
  {value: 'Stephen Curry'},
  {value: 'Kyrie Irving'},
  {value: 'LeBron James'},
  {value: 'James Harden'},
  {value: 'Jaylen Brown'},
  {value: 'Jayson Tatum'},
  {value: 'Lonzo Ball'},
  {value: 'Devin Booker'},
  {value: 'Carmelo Anthony'}
];


class PlayerSearch extends React.Component {
  constructor() {
    super();
    
    this.state = {
      result: false,
      loading: false,
      playerInfo: 
      {
        playerId: "",
        name: "",
        image: "",
        PPG: "",
        RPG: "",
        APG: "",
        SPG: "",
        BPG: "",
        FGP: "",
        TFGP: "",
        GP: "",
        MPG: "",
      }
    }
  };


  triggerSearch = (playerID, playerName) => {
    console.log("player id is " + playerID);
    let imageURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612744/2018/260x190/${playerID}.png`;
    let espnURL = `http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254`;
    let nbaURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2018/260x190/2544.png`;
    this.setState({
      loading: true,
      result: false,
      playerInfo: {
        ...this.state.playerInfo,
        playerId: playerID,
        name: playerName,
        image: imageURL
      }
    });
    // pull stats for the relevant player
    let stats = this.pull(playerID);
    let that = this;
  
    stats.then(function(result) {
      that.displayResults(result);
    })
  }

  displayResults = (stats) => {
    console.log(stats);
    let PTS = (stats.overallPlayerDashboard[0].pts).toFixed(1);
    let AST = (stats.overallPlayerDashboard[0].ast).toFixed(1);
    let REB = (stats.overallPlayerDashboard[0].reb).toFixed(1);
    let STL = (stats.overallPlayerDashboard[0].stl).toFixed(1);
    let BLK = (stats.overallPlayerDashboard[0].blk).toFixed(1);
    let FGpercent = Math.round((stats.overallPlayerDashboard[0].fgPct)*100);
    let Three_FGpercent = Math.round((stats.overallPlayerDashboard[0].fg3Pct)*100);
    let GP = stats.overallPlayerDashboard[0].gp;
    let MIN = (stats.overallPlayerDashboard[0].min).toFixed(1);
    console.log(PTS);
    console.log(this.state.playerInfo.image);

    this.setState({
      loading: false,
      result: true,
      playerInfo: {
        ...this.state.playerInfo,
        PPG: PTS,
        APG: AST,
        RPG: REB,
        SPG: STL,
        BPG: BLK,
        FGP: FGpercent,
        TFGP: Three_FGpercent,
        GP: GP,
        MPG: MIN
      }
    });
  }

  pull = (playerID) => NBA.stats.playerSplits({ PlayerID: playerID });

  selectedSearch = input => {
    var result = NBA.findPlayer(input).playerId;
    this.triggerSearch(result, input);
  }



  render() {
    return (
      <div className="playerSearch-wrapper">
        {/* <img src={this.state.playerInfo.image} alt="yooo" /> */}
        {/* <img src='https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2018/260x190/2544.png' /> */}
        {/* <img src='http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254' /> */}
        {/* <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2018/260x190/${this.state.playerInfo.playerId}.png`} /> */}
        <h3>Search for a player</h3>
        <p>{this.state.playerInfo.playerId}</p>

        <Downshift 
          onChange={selection => this.selectedSearch(selection.value)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <input className="downshift-input" {...getInputProps()} />
              <ul {...getMenuProps()} >
                {isOpen
                 ? items
                  .filter(item => !inputValue || item.value.toUpperCase().includes(inputValue.toUpperCase()))
                  .map((item, index) => (
                    <li 
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? 'lightgrey' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
                : null}
              </ul>

            </div>
          )}
        </Downshift>
        
        {this.state.result &&
          <PlayerCard 
            playerName={this.state.playerInfo.name}
            playerInfo={this.state.playerInfo}
          />
        }
        
      </div>
    );
  }
  }
  
  export default PlayerSearch;