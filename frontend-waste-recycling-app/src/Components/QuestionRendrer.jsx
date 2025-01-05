import questionStyle from "../Styles/questionStyle.js";

export default function QuestionRendrer({ question }) {
  return (
    <div>
      <div className="sm:text-4xl text-2xl font-semibold sm:font-bold text-[#f1f7fb] text-wrap font-[Droid Sans, sans-serif]">
        {question}
      </div>
    </div>
  );
}
