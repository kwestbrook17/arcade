import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../utils/queries";

const GameDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_GAMES);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;

  // Filter the specific game from the data
  const game = data.getGames.find((game) => game._id === id);

  // Add a button to render the iframe
  return (
    <div>
      {game ? (
        <div className="iframeContainerStyle">
          <iframe
            src={game.fileURL}
            title="Game"
            width="800" // Adjust width as needed
            height="800" // Adjust height as needed
          ></iframe>
        </div>
      ) : (
        <p>Game not found</p>
      )}
    </div>
  );
};

export default GameDetails;
