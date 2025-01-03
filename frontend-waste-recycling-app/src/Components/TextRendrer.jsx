export default function TextRendrer({ text, textStyle }) {
  return (
    <div className="">
      <div style={textStyle}>{text}</div>
    </div>
  );
}
