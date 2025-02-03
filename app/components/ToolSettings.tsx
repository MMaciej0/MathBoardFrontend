import { ensureHexColor } from '@/utils/ensureHexColor'
import type { EventEmitterAsyncResource } from 'events'
import type { Canvas, FabricObject } from 'fabric'
import { useEffect, useState } from 'react'

type ToolSettingsProps = {
  canvas: Canvas | null
}

export function ToolSettings({ canvas }: ToolSettingsProps) {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [diameter, setDiameter] = useState<number>(0)
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    if (canvas) {
      const handleSelectionCreated = (e: any) => {
        handleObjectSelection(e.selected[0])
      }

      const handleSelectionUpdated = (e: any) => {
        handleObjectSelection(e.selected[0])
      }

      const handleSelectionCleared = () => {
        setSelectedObject(null)
        clearSettings()
      }

      const handleObjectModified = (e: any) => {
        handleObjectSelection(e.target)
      }

      const handleObjectScaling = (e: any) => {
        handleObjectSelection(e.target)
      }

      canvas.on('selection:created', handleSelectionCreated)
      canvas.on('selection:updated', handleSelectionUpdated)
      canvas.on('selection:cleared', handleSelectionCleared)
      canvas.on('object:modified', handleObjectModified)
      canvas.on('object:scaling', handleObjectScaling)

      return () => {
        canvas.off('selection:created', handleSelectionCreated)
        canvas.off('selection:updated', handleSelectionUpdated)
        canvas.off('selection:cleared', handleSelectionCleared)
        canvas.off('object:modified', handleObjectModified)
        canvas.off('object:scaling', handleObjectScaling)
      }
    }
  }, [canvas])

  const handleObjectSelection = (object: any) => {
    if (!object) return
    setSelectedObject(object)

    if (object.type === 'circle') {
      setDiameter(Math.round(object.radius * 2 * object.scaleX))
      setColor(object.fill)
      setWidth(0)
      setHeight(0)
    } else if (object.type === 'rect') {
      setWidth(Math.round(object.width) * object.scaleX)
      setHeight(Math.round(object.height) * object.scaleY)
      setColor(object.fill)
      setDiameter(0)
    }
  }

  const clearSettings = () => {
    setWidth(0)
    setHeight(0)
    setDiameter(0)
    setColor('')
  }

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiameter = Number(e.target.value)
    setDiameter(newDiameter)
    if (selectedObject && selectedObject.type === 'circle') {
      selectedObject.set('radius', newDiameter / (2 * selectedObject.scaleX))
      canvas?.renderAll()
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    if (selectedObject) {
      selectedObject.set('fill', newColor)
      canvas?.renderAll()
    }
  }

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value)
    setWidth(newWidth)
    if (selectedObject && selectedObject.type === 'rect') {
      selectedObject.set('width', newWidth / selectedObject.scaleX)
      canvas?.renderAll()
    }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value)
    setHeight(newHeight)
    if (selectedObject && selectedObject.type === 'rect') {
      selectedObject.set('height', newHeight / selectedObject.scaleY)
      canvas?.renderAll()
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-100 p-4 shadow-lg rounded w-64">
      {selectedObject ? (
        selectedObject.type === 'circle' ? (
          <div>
            <h3 className="font-bold text-sm mb-2">Edytuj Okrąg</h3>
            <div className="mb-2">
              <label className="block text-xs mb-1" htmlFor="diameter-input">
                Średnica:
              </label>
              <input
                id="diameter-input"
                type="number"
                value={diameter}
                onChange={handleDiameterChange}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded p-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" htmlFor="color-input">
                Kolor:
              </label>
              <input
                id="color-input"
                type="color"
                value={ensureHexColor(color)}
                onChange={handleColorChange}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded p-1 text-sm h-8"
              />
            </div>
          </div>
        ) : selectedObject.type === 'rect' ? (
          <div>
            <h3 className="font-bold text-sm mb-2">Edytuj Prostokąt</h3>
            <div className="mb-2">
              <label className="block text-xs mb-1" htmlFor="width-input">
                Szerokość:
              </label>
              <input
                id="width-input"
                type="number"
                value={width}
                onChange={handleWidthChange}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded p-1 text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs mb-1" htmlFor="height-input">
                Wysokość:
              </label>
              <input
                id="height-input"
                type="number"
                value={height}
                onChange={handleHeightChange}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded p-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" htmlFor="color-input-rect">
                Kolor:
              </label>
              <input
                id="color-input-rect"
                type="color"
                value={ensureHexColor(color)}
                onChange={handleColorChange}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded p-1 text-sm h-8"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs">Wybrany obiekt nie jest edytowalny</p>
        )
      ) : (
        <p className="text-xs">Żaden obiekt nie został wybrany</p>
      )}
    </div>
  )
}
