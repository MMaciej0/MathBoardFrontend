import type { Route } from './+types/board'
import { useEffect, useState } from 'react'
import { Toolbox } from '@/components/Toolbox'
import { CanvasArea } from '@/components/CanvasArea'
import { ToolProvider } from '@/context/ToolContext'
import type { Canvas } from 'fabric'
import { ToolSettings } from '@/components/ToolSettings'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Tablica' }, { name: 'Tablica', content: 'Rysuj, maluj i marz!' }]
}

export default function Board() {
  const [canvas, setCanvas] = useState<Canvas | null>(null)

  useEffect(() => {
    console.clear()
  }, [])

  return (
    <ToolProvider>
      <main className="h-screen w-full overflow-hidden">
        <CanvasArea canvas={canvas} setCanvas={setCanvas} />
        <Toolbox  />
        <ToolSettings canvas={canvas} />
      </main>
    </ToolProvider>
  )
}
