import React, { useEffect, useState, useMemo } from "react";
import loadJsonFiles from "./loadJson";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Papa from "papaparse";

const columnHelper = createColumnHelper();

function Data(props) {
  let jsonData = props.jsonData
  let awards = props.awards;
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [teamAbbreviations, setTeamAbbreviations] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("all");



  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    const seasonData = jsonData.find((seasonData) => seasonData.season === season);
    const teams = Array.from(new Set(seasonData?.players.map((player) => player.Team)));
    setTeamAbbreviations(teams);
    setSelectedTeam("all"); 
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  const selectedPlayers = useMemo(() => {
    if (!selectedSeason) return [];
    const seasonData = jsonData.find((seasonData) => seasonData.season === selectedSeason)?.players || [];
    return selectedTeam === "all" ? seasonData : seasonData.filter((player) => player.Team === selectedTeam);
  }, [selectedSeason, selectedTeam, jsonData]);

  const awardYear = selectedSeason ? awards[selectedSeason] : null;

  const columns = useMemo(() => [
    columnHelper.accessor("Player", {
      header: "Player Name",
      cell: (info) => {
        const player = info.row.original;
        const playerId = player["Player-additional"];
        return (
          <a
            href={`https://www.basketball-reference.com/players/${playerId[0]}/${playerId}.html`}
            target="_blank"
            rel="noreferrer"
          >
            {player.Player}
            {awardYear && awardYear.MVP === playerId ? " (MVP)" : ""}
            {awardYear && awardYear.IBM === playerId ? ` (${selectedSeason < 1987 ? "Schick Award/pre-IBM Award era" : "IBM Award"})` : ""}
          </a>
        );
      },
    }),
    columnHelper.accessor("IBM Score", {
      header: "IBM Score",
    }),
    columnHelper.accessor("Team", {
      header: "Team",
    }),
    columnHelper.accessor("G", {
      header: "Games Played",
    }),
  ], [awardYear]);

  const table = useReactTable({
    data: selectedPlayers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const downloadCSV = () => {
    const csvData = Papa.unparse(selectedPlayers);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `${selectedSeason}-players.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      {/* Season Select Dropdown */}
      <Select onValueChange={handleSeasonChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a season" />
        </SelectTrigger>
        <SelectContent>
          {jsonData.map(({ season }) => (
            <SelectItem key={season} value={season}>
              {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedSeason && (
        <>
          {/* Team Select Dropdown */}
          <Select onValueChange={handleTeamChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select team abbreviation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"all"} value={"all"}>All</SelectItem>
              {teamAbbreviations.sort().map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      {selectedPlayers && selectedPlayers.length > 0 && (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Players for {selectedSeason - 1} - {selectedSeason}</h2>
            <button onClick={downloadCSV} className="btn btn-primary">Download CSV</button>
          </div>

          <table className="table-data">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-2 border">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={table.getState().pagination.pageIndex === 0 ? "first-page btn" : "btn"}
            >
              Previous
            </button>
            <span className="page-number">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={table.getState().pagination.pageIndex + 1 === table.getPageCount() ? "last-page btn" : "btn"}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;
