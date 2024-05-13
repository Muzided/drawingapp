'use client'
import { FC, useState } from "react";
import { useDraw } from "./hooks/useDraw";
import { ChromePicker } from 'react-color'

interface pageProps { }
const page: FC<pageProps> = ({ }) => {
  const [color, setColor] = useState<string>('#000')

  const { canvasRef, onMouseDown, clear } = useDraw(darwLine)

  function darwLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return <div className=" bg-white flex items-center justify-center h-screen">
    <div className="flex flex-col space-y-4 p-4">
    <ChromePicker
      color={color}
      onChange={((e) => { setColor(e.hex) })}
    />
    <button type="button" className="p-2 rounded-md border border-black" onClick={clear}> Clear</button>
    </div>
   
    <canvas
      onMouseDown={onMouseDown}
      ref={canvasRef}
      height={550}
      width={550}
      className="border border-black rounded-md"
    />
  </div>
}
export default page