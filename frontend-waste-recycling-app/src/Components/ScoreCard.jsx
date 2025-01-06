function ScoreCard({ score, totalQuestions }) {
  return (
    <div className="bg-gray-800 text-white p-2 sm:p-4 rounded-md shadow-lg max-w-xs mx-auto">
      <h2 className="sm:text-base md:text-lg font-semibold text-center">Your Score</h2>
      <div className="mt-1 lg:mt-2 text-center">
        <p className="text-4xl font-bold md:text-5xl lg:text-6xl">{score}</p>
        <p className="text-sm md:text-base">out of {totalQuestions}</p>
      </div>
    </div>
  );
}

export default ScoreCard;
