function FinishedScreen({ points, maxPoints, highScore, dispatch }) {
  const precentage = (points / maxPoints) * 100;
  let emoji;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 80 && precentage < 100) emoji = "🥈";
  if (precentage >= 50 && precentage < 80) emoji = "🥉";
  if (precentage < 50) emoji = "👎";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(precentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} Points)</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
