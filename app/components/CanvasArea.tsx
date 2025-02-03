import { useRef, useState, useEffect } from 'react'
import { Canvas, PencilBrush, SprayBrush } from 'fabric'
//import { useCanvasTools } from '@/hooks/useCanvasTools'
import { useToolContext } from '@/context/ToolContext'
import { addCircle, addRectangle, addTriangle } from '@/lib/canvasUtils'

type CanvasAreaProps = {
  canvas: Canvas | null
  setCanvas: (canvas: Canvas) => void
}

export function CanvasArea( { canvas, setCanvas }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeTool, setActiveTool } = useToolContext()

  useEffect(() => {
    if (canvasRef.current) {
      // inicjalizacja tablicy
      const initCanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#333',
        isDrawingMode: false,
        selection: false,
      })

      initCanvas.freeDrawingBrush = new PencilBrush(initCanvas)
      initCanvas.freeDrawingBrush.width = 5
      initCanvas.freeDrawingBrush.color = '#ffffff'

      initCanvas.renderAll()
      setCanvas(initCanvas)

      return () => initCanvas.dispose() as unknown as void // zwalnia pamięc
    }
  }, [])

  //useCanvasTools(canvas, activeTool);                                                       // obsługa narzędzi

  useEffect(() => {
    if (!canvas) return

    canvas.isDrawingMode = false // reset narzedzi
    canvas.selection = false

    switch (activeTool) {
      case 'cursor':
        console.log('Kursor')
        canvas.selection = true
        break
      case 'move':
        console.log('Przesuń')
        canvas.selection = false
        break
      case 'pen':
      case 'brush':
      case 'marker':
        console.log(`${activeTool}`);
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        canvas.freeDrawingBrush.color = '#ffffff'
        canvas.freeDrawingBrush.width = activeTool === 'pen' ? 2 : activeTool === 'brush' ? 5 : 15 
        break
      case 'spray':
        console.log('Spray')
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush = new SprayBrush(canvas)
        canvas.freeDrawingBrush.width = 30
        break
      case 'eraser':
        console.log('Gumka')
        canvas.selection = false
        canvas.isDrawingMode = false
        break
      case 'triangle':
        console.log('Trojkąt')
        addTriangle(canvas)
        setActiveTool('cursor')
        break
      case 'rectangle':
        console.log('Prostokąt')
        addRectangle(canvas)
        setActiveTool('cursor')
        break
      case 'circle':
        console.log('Koło')
        addCircle(canvas)
        setActiveTool('cursor')
        break
      default:
        console.warn(`Nieznane narzędzie: ${activeTool}`)
    }
    canvas.renderAll()
  }, [activeTool, canvas])

  return <canvas ref={canvasRef}></canvas>
}
