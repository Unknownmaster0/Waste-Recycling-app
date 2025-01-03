import optionsStyle from "../Styles/optionsStyle";
import TextRendrer from "./TextRendrer";

export default function OptionsRendrer({ options }) {
  return (
    <div>
      {options.map((option, index) => (
        <TextRendrer key={index} text={option} textStyle={optionsStyle} />
      ))}
    </div>
  );
}
