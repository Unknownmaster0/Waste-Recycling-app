import questionStyle from "../Styles/questionStyle";
import TextRendrer from "./TextRendrer";

export default function QuestionRendrer({ question }) {
  return (
    <div>
      <TextRendrer text={question} textStyle={questionStyle} />
    </div>
  );
}
