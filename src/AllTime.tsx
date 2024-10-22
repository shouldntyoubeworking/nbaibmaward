import { json } from "stream/consumers";

export default function AllTime(props: any) {
    let jsonData = props.jsonData;
    let awards = props.awards;
    let handledSeasons = []
    for (let index = 0; index < jsonData.length; index++) {
        let seasonValue = jsonData[index];
        let awardSeason = awards[seasonValue["season"]]
        let TopIBM = seasonValue["players"][0]
        let IBM = seasonValue["players"].filter((player: Object | any) => {
            return player["Player-additional"] == awardSeason.IBM;
        })
        let MVP = seasonValue["players"].filter((player: Object | any) => {
            return player["Player-additional"] == awardSeason.MVP;
        })
        if (IBM.length == 1) {
            IBM = IBM[0]
        } else {
            IBM = ""
        }
        MVP = MVP[0]
        let temp = {
            "season": seasonValue["season"],
            "MVP": MVP,
            "IBM": IBM,
            "TopIBM": TopIBM
        }
        handledSeasons.push(temp);
    }
    let firstHalf = handledSeasons.slice(0, 3);
    let secondHalf = handledSeasons.slice(3);
    let midIndex = Math.floor(secondHalf.length / 2);
    let displayHalf = secondHalf.slice(0, midIndex);
    let displayHalfTwo = handledSeasons.slice(midIndex);
    const yearHandler = (year, index, pre = false) => {
        const playerHandler = (player, pre = false) => {
            return <td className={`award-player ${pre ? "pre-years" : ""}`}>
                {player.Player} {Math.round(player["IBM Score"] * 100) / 100}

            </td>


        }
        return <tr className="award-year" key={index}>
            <td>
                {year.season}
            </td>
                {pre ? playerHandler(year.IBM, pre) : ""}
                {playerHandler(year.MVP, pre)}
                {playerHandler(year.TopIBM, pre)}
        </tr>
    }
    return <div className="award-container">
   
        
        <div className="award-column">
  
            <table className="awards-table">
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>MVP</th>
                        <th>IBM Award</th>
                    </tr>
                        {displayHalfTwo.reverse().map((obj, index) => {
                            return yearHandler(obj, index, false)
                        })}
                </tbody>
            </table>

        </div>

        <div className="award-gap">

        </div>

        <div className="award-column">
            
            <table className="awards-table">
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>MVP</th>
                        <th>IBM Award</th>
                    </tr>
                        {displayHalf.reverse().map((obj, index) => {
                            return yearHandler(obj, index, false)
                        })}
                </tbody>
            </table><table className="awards-table">
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>IBM Award</th>
                        <th>Top IBM Score (Pre-1987)</th>
                        <th>MVP</th>
                    </tr>
                        {firstHalf.reverse().map((obj, index) => {
                            return yearHandler(obj, index, true)
                        })}
                </tbody>
            </table>

        </div>



    </div>
}