// Funkcja pomocnicza konwertująca "rgb(...)" lub nazwę koloru na hex
export function ensureHexColor(color: string): string {
  // Jeśli kolor już jest w formacie hex (3 lub 6 znaków)
  if (/^#([0-9a-fA-F]{3}){1,2}$/.test(color)) {
    return color
  }
  // Jeśli kolor jest w formacie rgb(a)
  if (color.startsWith('rgb')) {
    const result = color.match(/\d+/g)
    if (result && result.length >= 3) {
      const [r, g, b] = result
      return (
        '#' +
        [r, g, b]
          .map(x => {
            const hex = parseInt(x).toString(16)
            return hex.length === 1 ? '0' + hex : hex
          })
          .join('')
      )
    }
  }
  // W przypadku nazwy koloru lub innych formatów, utwórz tymczasowy element,
  // aby pobrać skomputowany styl
  const tempElem = document.createElement('div')
  tempElem.style.color = color
  document.body.appendChild(tempElem)
  const computedColor = getComputedStyle(tempElem).color
  document.body.removeChild(tempElem)
  // Teraz computedColor powinno być w formacie rgb(...)
  const result = computedColor.match(/\d+/g)
  if (result && result.length >= 3) {
    const [r, g, b] = result
    return (
      '#' +
      [r, g, b]
        .map(x => {
          const hex = parseInt(x).toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    )
  }
  return '#000000' // domyślny kolor, jeśli konwersja się nie powiedzie
}
