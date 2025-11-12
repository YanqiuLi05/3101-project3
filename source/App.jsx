import { useEffect, useMemo, useRef, useState } from "react"
import Tile from "./components/Tile.jsx"
import TextNode from "./components/TextNode.jsx"
import basePattern from "./pattern.png"

const COLS = 3
const ROWS = 3
const TILE_COUNT = COLS * ROWS
const uid = () => Math.random().toString(36).slice(2, 9)
const makeTiles = () => Array.from({ length: TILE_COUNT }, (_, i) => ({ id: `t-${i}`, rot: 0, mir: false }))
const cycle = (t) => ({ ...t, rot: (t.rot + 90) % 360, mir: !t.mir })

const STICKER_SLOTS = {
  sticker1: { left: 16.7, top: 16.7 },
  sticker2: { left: 50.0, top: 16.7 },
  sticker3: { left: 83.3, top: 16.7 },
  sticker4: { left: 16.7, top: 83.3 },
  sticker5: { left: 50.0, top: 83.3 },
  sticker6: { left: 83.3, top: 83.3 },
}

const PALETTE = [
  { id: "sticker1", src: "/stickers/sticker1.png" },
  { id: "sticker2", src: "/stickers/sticker2.png" },
  { id: "sticker3", src: "/stickers/sticker3.png" },
  { id: "sticker4", src: "/stickers/sticker4.png" },
  { id: "sticker5", src: "/stickers/sticker5.png" },
  { id: "sticker6", src: "/stickers/sticker6.png" },
]

export default function App() {
  const [imgURL] = useState(basePattern)
  const [tiles, setTiles] = useState(makeTiles)
  const [texts, setTexts] = useState([])
  const [draft, setDraft] = useState("")
  const color = "rgb(246, 105, 32)"
  const [visible, setVisible] = useState({})
  const posterRef = useRef(null)

  const onTileClick = (idx) => setTiles((arr) => arr.map((t, i) => (i === idx ? cycle(t) : t)))

  const addText = () => {
    if (!draft.trim()) return
    setTexts((arr) => [...arr, { id: uid(), x: 50, y: 50, value: draft.trim(), color }])
    setDraft("")
  }

  const toggleSticker = (id) => setVisible((v) => ({ ...v, [id]: !v[id] }))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && texts.length > 0)
        setTexts((arr) => arr.slice(0, -1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [texts.length])

  const posterClass = useMemo(() => `poster`, [])

  return (
    <>
      <header>
        <h1>Build a Poster!</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Add a Title!"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button onClick={addText}>Add a Title!</button>
        </div>
        <div className="caption">Click each of the patterns to rotate and mirror them. Click a sticker to put it on your poster! </div>
      </header>

      <div className="stage">
        <aside className="palette">
          <div className="palette-grid">
            {PALETTE.map((it) => (
              <button
                key={it.id}
                className="palette-item"
                onClick={() => toggleSticker(it.id)}
              >
                <img src={it.src} alt="" />
              </button>
            ))}
          </div>
        </aside>

        <div className="poster-wrap">
          <div className={posterClass} ref={posterRef}>
            <div className="grid">
              {tiles.map((t, i) => (
                <Tile key={t.id} imgURL={imgURL} rot={t.rot} mir={t.mir} onClick={() => onTileClick(i)} />
              ))}
            </div>
            {texts.map((t) => <TextNode key={t.id} data={t} />)}
            {PALETTE.map((it) => {
              if (!visible[it.id]) return null
              const pos = STICKER_SLOTS[it.id]
              if (!pos) return null
              return (
                <div key={`placed-${it.id}`} className="sticker" style={{ left: `${pos.left}%`, top: `${pos.top}%` }}>
                  <img src={it.src} alt="" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
