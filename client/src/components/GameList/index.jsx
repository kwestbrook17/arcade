import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../../utils/queries";
import GameItem from "../GameItem";

const GameList = () => {
  const { loading, error, data } = useQuery(QUERY_GAMES);

  if (loading) return <p>Loading games...</p>;

  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error loading games!</p>;
  }

  return (
    <div>
      {data.getGames.map((game) => (
        <GameItem key={game._id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
