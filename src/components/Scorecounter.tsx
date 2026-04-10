export function Scorecounter({ score }: { score: number }) {
  return (
    <div className="scorecounter">
      <div className="scorecounter-value">
        <span className="scorecounter-value-text">{score}</span>
      </div>
    </div>
  );
}