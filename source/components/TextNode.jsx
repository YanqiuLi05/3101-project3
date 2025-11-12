export default function TextNode({ data }) {
  const { x, y, value, color } = data
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    transform: "translate(-50%, -50%)",
    fontFamily: '"Lobster", cursive',
    color,
    WebkitTextStroke: "1px white",
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
    lineHeight: 1,
    whiteSpace: "pre-wrap",
    textAlign: "center",
    fontSize: "140px",
  }
  return <div className="ttext" style={style}>{value}</div>
}
