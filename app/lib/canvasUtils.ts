import { Canvas, Rect, Circle, Polygon } from 'fabric'

// tworzy nowy trojkąt
export const addTriangle = (canvas: Canvas) => {
  const triangle = new Polygon(
    [
      { x: 50, y: 0 }, 
      { x: 0, y: 100 }, 
      { x: 100, y: 100 }, 
    ],
    {
      top: 100,
      left: 100,
      fill: 'rgb(255, 0, 0)',
    }
  )

  canvas.add(triangle)
  canvas.renderAll()
}

// tworzy nowy prostokat
export const addRectangle = (canvas: Canvas) => {
  const rect = new Rect({
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    fill: 'rgb(255, 0, 0)',
  })
  canvas.add(rect)
}

// tworzy nowe kolo
export const addCircle = (canvas: Canvas) => {
  const circle = new Circle({
    top: 100,
    left: 100,
    radius: 50,
    fill: 'rgb(255, 0, 0)',
  })
  canvas.add(circle)
}
