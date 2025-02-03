import { useEffect } from 'react'
import { Canvas } from 'fabric'
import { addCircle, addRectangle, addTriangle } from '../lib/canvasUtils'
import { useToolContext } from '@/context/ToolContext'

type ToolHandler = (canvas: Canvas) => void

type UseCanvasTools = (canvas: Canvas | null, activeTool: string) => void

const TOOL_HANDLERS: Record<string, ToolHandler> = {
  rectangle: canvas => {
    addRectangle(canvas)
  },
  circle: canvas => {
    addCircle(canvas)
  },
  triangle: canvas => {
    addTriangle(canvas)
  },
}

export const useCanvasTools: UseCanvasTools = (canvas, activeTool) => {
  const { setActiveTool } = useToolContext()

  useEffect(() => {
    if (!canvas) return

    const handler = TOOL_HANDLERS[activeTool]

    if (handler) {
      handler(canvas)
      canvas.renderAll()

      setActiveTool('cursor')
    }
  }, [activeTool, canvas])
}
