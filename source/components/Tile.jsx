export default function Tile({ imgURL, rot, mir, onClick }) {
  const style = { transform: `scaleX(${mir ? -1 : 1}) rotate(${rot}deg)` }
  return (
    <div className="tile">
      <button onClick={onClick}>
        <img className="img" src={imgURL} alt="" style={style} />
      </button>
    </div>
  )
}
