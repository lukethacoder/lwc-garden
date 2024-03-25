export class Resizer {
  sliderNode: HTMLElement
  targetNode: HTMLElement
  direction: 'horizontal' | 'vertical'

  constructor(
    sliderNode: HTMLElement,
    targetNode: HTMLElement,
    direction: 'horizontal' | 'vertical' = 'horizontal'
  ) {
    this.sliderNode = sliderNode
    this.targetNode = targetNode
    this.direction = direction

    const isHorizontal = direction === 'horizontal'

    const valueFromLocalStorage = localStorage.getItem(
      `${this.targetNode.className}-${direction}`
    )
    if (valueFromLocalStorage) {
      // read resize position from localStorage
      this.targetNode.style[isHorizontal ? 'width' : 'height'] =
        valueFromLocalStorage
    }

    this.sliderNode.onmousedown = (event: MouseEvent) => {
      let dragX = isHorizontal ? event.clientX : event.clientY

      document.onmousemove = (eventMouseMove: MouseEvent) => {
        const { clientX, clientY } = eventMouseMove
        if (isHorizontal) {
          const newWidth = this.targetNode.offsetWidth + clientX - dragX + 'px'

          this.targetNode.style.width = newWidth
          dragX = clientX

          localStorage.setItem(
            `${this.targetNode.className}-${direction}`,
            newWidth
          )
        } else {
          const { offsetHeight } = this.targetNode
          const newHeight = offsetHeight + (dragX - clientY) + 'px'

          this.targetNode.style.height = newHeight
          dragX = clientY

          localStorage.setItem(
            `${this.targetNode.className}-${direction}`,
            newHeight
          )
        }
      }

      document.onmouseup = () =>
        (document.onmousemove = document.onmouseup = null)
    }
  }
}
