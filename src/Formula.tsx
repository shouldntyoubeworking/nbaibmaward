export default function Formula(props: any) {
    return <div className="formula-container">
        <h2>Formula</h2>
        <div className="formula-code">
                player_counting = (player_pts - player_fga + player_reb + player_ast + player_stl + player_blk - player_pf - player_to) <br />
                player_score = (player_counting + (team_wins * 10)) * 250<br />
                team_score = team_pts - team_fga + team_reb + team_ast + team_stl + team_blk - team_pf - team_to<br />
        </div>

    </div>

    
}