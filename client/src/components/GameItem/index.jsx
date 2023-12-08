import { Link } from "react-router-dom";

const GameItem = ({ game }) => {
  const { _id, title, description, thumbnail, fileURL } = game;

  return (
    <div className="game-item">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/games/${_id}`}>Play</Link>
    </div>
  );
};

export default GameItem;
