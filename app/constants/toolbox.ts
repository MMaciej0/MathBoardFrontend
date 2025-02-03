import {
  MousePointer,
  Eraser,
  Square,
  RectangleHorizontal,
  Circle,
  Paintbrush,
  Pen,
  SprayCan,
  Expand,
  Triangle
} from 'lucide-react'

export type Tool = {
  id: string
  label: string
  icon: React.ElementType
  subTools?: Tool[]
}

export const TOOLS: Tool[] = [
  { id: 'cursor', label: 'Kursor', icon: MousePointer },
  { id: 'move', label: 'Przesuń', icon: Expand },
  { id: 'pen', label: 'Długopis', icon: Pen },
  { id: 'eraser', label: 'Gumka', icon: Eraser },
  {
    id: 'shapes',
    label: 'Obiekty',
    icon: Square,
    subTools: [
      { id: 'triangle', label: 'Trójkąt', icon: Triangle },
      { id: 'rectangle', label: 'Prostokąt', icon: RectangleHorizontal },
      { id: 'circle', label: 'Koło', icon: Circle },
    ],
  },
  {
    id: 'drawing',
    label: 'Przyborniki',
    icon: Paintbrush,
    subTools: [
      { id: 'brush', label: 'Pędzel', icon: Paintbrush },
      { id: 'marker', label: 'Marker', icon: Pen },
      { id: 'spray', label: 'Spray', icon: SprayCan },
    ],
  },
]
