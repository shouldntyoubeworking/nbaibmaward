import React, { useState } from 'react';

export default function LastSeason(props) {
    let jsonData = props.jsonData;
    let awards = props.awards;
    let lastSeasonData = null;
    let lastSeason = "2024";
    
    const nbaTeams = [
        { 
          city_name: "Atlanta", 
          team_name: "Hawks", 
          display_name: "Hawks", 
          abbreviation: "ATL", 
          conference: "Eastern", 
          hex_color: "#E03A31" 
        },
        { 
          city_name: "Boston", 
          team_name: "Celtics", 
          display_name: "Celtics", 
          abbreviation: "BOS", 
          conference: "Eastern", 
          hex_color: "#007A33" 
        },
        { 
          city_name: "Brooklyn", 
          team_name: "Nets", 
          display_name: "Nets", 
          abbreviation: "BRK", 
          conference: "Eastern", 
          hex_color: "#000000" 
        },
        { 
          city_name: "Charlotte", 
          team_name: "Hornets", 
          display_name: "Hornets", 
          abbreviation: "CHO", 
          conference: "Eastern", 
          hex_color: "#00B2E2" 
        },
        { 
          city_name: "Chicago", 
          team_name: "Bulls", 
          display_name: "Bulls", 
          abbreviation: "CHI", 
          conference: "Eastern", 
          hex_color: "#CE1141" 
        },
        { 
          city_name: "Cleveland", 
          team_name: "Cavaliers", 
          display_name: "Cavaliers", 
          abbreviation: "CLE", 
          conference: "Eastern", 
          hex_color: "#6F263D" 
        },
        { 
          city_name: "Dallas", 
          team_name: "Mavericks", 
          display_name: "Mavericks", 
          abbreviation: "DAL", 
          conference: "Western", 
          hex_color: "#00538C" 
        },
        { 
          city_name: "Denver", 
          team_name: "Nuggets", 
          display_name: "Nuggets", 
          abbreviation: "DEN", 
          conference: "Western", 
          hex_color: "#00285E" 
        },
        { 
          city_name: "Detroit", 
          team_name: "Pistons", 
          display_name: "Pistons", 
          abbreviation: "DET", 
          conference: "Eastern", 
          hex_color: "#C8102E" 
        },
        { 
          city_name: "Golden State", 
          team_name: "Warriors", 
          display_name: "Warriors", 
          abbreviation: "GSW", 
          conference: "Western", 
          hex_color: "#FFCD34" 
        },
        { 
          city_name: "Houston", 
          team_name: "Rockets", 
          display_name: "Rockets", 
          abbreviation: "HOU", 
          conference: "Western", 
          hex_color: "#CE1141" 
        },
        { 
          city_name: "Indiana", 
          team_name: "Pacers", 
          display_name: "Pacers", 
          abbreviation: "IND", 
          conference: "Eastern", 
          hex_color: "#002D72" 
        },
        { 
          city_name: "Los Angeles", 
          team_name: "Clippers", 
          display_name: "Clippers", 
          abbreviation: "LAC", 
          conference: "Western", 
          hex_color: "#C8102E" 
        },
        { 
          city_name: "Los Angeles", 
          team_name: "Lakers", 
          display_name: "Lakers", 
          abbreviation: "LAL", 
          conference: "Western", 
          hex_color: "#552583" 
        },
        { 
          city_name: "Memphis", 
          team_name: "Grizzlies", 
          display_name: "Grizzlies", 
          abbreviation: "MEM", 
          conference: "Western", 
          hex_color: "#5D76A9" 
        },
        { 
          city_name: "Miami", 
          team_name: "Heat", 
          display_name: "Heat", 
          abbreviation: "MIA", 
          conference: "Eastern", 
          hex_color: "#98002E" 
        },
        { 
          city_name: "Milwaukee", 
          team_name: "Bucks", 
          display_name: "Bucks", 
          abbreviation: "MIL", 
          conference: "Eastern", 
          hex_color: "#00471B" 
        },
        { 
          city_name: "Minnesota", 
          team_name: "Timberwolves", 
          display_name: "Timberwolves", 
          abbreviation: "MIN", 
          conference: "Western", 
          hex_color: "#005A8B" 
        },
        { 
          city_name: "New Orleans", 
          team_name: "Pelicans", 
          display_name: "Pelicans", 
          abbreviation: "NOP", 
          conference: "Western", 
          hex_color: "#B4975A" 
        },
        { 
          city_name: "New York", 
          team_name: "Knicks", 
          display_name: "Knicks", 
          abbreviation: "NYK", 
          conference: "Eastern", 
          hex_color: "#F58400" 
        },
        { 
          city_name: "Oklahoma City", 
          team_name: "Thunder", 
          display_name: "Thunder", 
          abbreviation: "OKC", 
          conference: "Western", 
          hex_color: "#007AC1" 
        },
        { 
          city_name: "Orlando", 
          team_name: "Magic", 
          display_name: "Magic", 
          abbreviation: "ORL", 
          conference: "Eastern", 
          hex_color: "#0077C9" 
        },
        { 
          city_name: "Philadelphia", 
          team_name: "76ers", 
          display_name: "76ers", 
          abbreviation: "PHI", 
          conference: "Eastern", 
          hex_color: "#006BB6" 
        },
        { 
          city_name: "Phoenix", 
          team_name: "Suns", 
          display_name: "Suns", 
          abbreviation: "PHO", 
          conference: "Western", 
          hex_color: "#E67E22" 
        },
        { 
          city_name: "Portland", 
          team_name: "Trail Blazers", 
          display_name: "Trail Blazers", 
          abbreviation: "POR", 
          conference: "Western", 
          hex_color: "#E03A31" 
        },
        { 
          city_name: "Sacramento", 
          team_name: "Kings", 
          display_name: "Kings", 
          abbreviation: "SAC", 
          conference: "Western", 
          hex_color: "#5A2D81" 
        },
        { 
          city_name: "San Antonio", 
          team_name: "Spurs", 
          display_name: "Spurs", 
          abbreviation: "SAS", 
          conference: "Western", 
          hex_color: "#C4CED4" 
        },
        { 
          city_name: "Toronto", 
          team_name: "Raptors", 
          display_name: "Raptors", 
          abbreviation: "TOR", 
          conference: "Eastern", 
          hex_color: "#A50034" 
        },
        { 
          city_name: "Utah", 
          team_name: "Jazz", 
          display_name: "Jazz", 
          abbreviation: "UTA", 
          conference: "Western", 
          hex_color: "#002D72" 
        },
        { 
          city_name: "Washington", 
          team_name: "Wizards", 
          display_name: "Wizards", 
          abbreviation: "WAS", 
          conference: "Eastern", 
          hex_color: "#002A5C" 
        }
      ];
    const [team, setTeam] = useState("BOS"); 
    const [teamObj, setTeamObj] = useState(nbaTeams.filter((teamVal) => { return teamVal.abbreviation === "BOS"})[0]); 

    for (let index = 0; index < jsonData.length; index++) {
        let seasonValue = jsonData[index];
        if (seasonValue["season"] === lastSeason) {
            lastSeasonData = seasonValue;
        }
    }
    if(lastSeasonData == null){
        return null;
    }
    let players = lastSeasonData["players"].filter((player) => {
       return player.Team == team;
    })
    let handledPlayers = players.sort((a, b) => b["IBM Score"] - a["IBM SCore"]);
    const handleTeamSelect = (abbreviation) => {
        setTeam(abbreviation);
        setTeamObj(nbaTeams.filter((teamVal) => { return teamVal.abbreviation === abbreviation})[0])
    };
    const playerData = (player) => {
        return <div className="player-chyron">
        <div className='player-name'>{player.Player == "Nikola Jokić" ? "Nikola Jokić (MVP)" : player.Player}</div>
        <div className='player-score'>{Math.round(player["IBM Score"] * 100) / 100}</div>
    </div>
    }
    return (
        <>
            <div className="nba-jam-container">
                <div className="nba-jam-team-select">
                    <div className="nba-jam-teams west">
                        {nbaTeams
                            .filter((team) => team.conference === "Western")
                            .map((team) => (
                                <div
                                    key={team.abbreviation}
                                    onClick={() => handleTeamSelect(team.abbreviation)}
                                >
                                    {team.city_name == "Los Angeles" ? `L.A. ${team.team_name}` : team.city_name}
                                </div>
                            ))}
                    </div>
                    <div className="nba-jam-teams east">
                        {nbaTeams
                            .filter((team) => team.conference === "Eastern")
                            .map((team) => (
                                <div
                                    key={team.abbreviation}
                                    onClick={() => handleTeamSelect(team.abbreviation)}
                                >
                                    {team.city_name}
                                </div>
                            ))}
                    </div>
                </div>
                <div className={`nba-jam-window ${team}`} style={{
                    background: `url(/nba/${teamObj.team_name.replace(" ", "").toLowerCase()}.svg)`,
                    backgroundColor: `${teamObj.hex_color}`
                }}>
                    <div className='nba-jam-title'>2023-24 Season</div>
                    <div className="nba-jam-player-name-chyron">
                        {playerData(handledPlayers[0])}
                        {playerData(handledPlayers[1])}
                    </div>
                </div>
            </div>
        </>
    );
}
