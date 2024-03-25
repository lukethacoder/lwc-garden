import { LightningElement, api } from 'lwc'
import { Module } from 'packages/app/config/types'

export default class CommandPalette extends LightningElement {
  @api
  showModal() {
    ;(this.refs.dialogEl as HTMLDialogElement).showModal()
  }

  @api
  show() {
    ;(this.refs.dialogEl as HTMLDialogElement).show()
  }

  @api
  close() {
    ;(this.refs.dialogEl as HTMLDialogElement).close()
  }

  @api modules: Module[] = []

  filterValue: string = ''
  filteredModules: Module[] = []

  handleOnInput = (event: KeyboardEvent) => {
    this.handleSearchModule((event.target as HTMLInputElement).value)
  }

  handleSearchModule = (stringValue: string) => {
    this.filterValue = stringValue

    if (stringValue && this.modules) {
      this.filteredModules = this.modules
        .filter(
          (item) =>
            item.label.toLowerCase().includes(stringValue.toLowerCase()) ||
            item.name.toLowerCase().includes(stringValue.toLowerCase())
        )
        // max 10 matching items
        .slice(0, 10)
    } else {
      this.filteredModules = []
    }
  }

  handleClickModule = (event) => {
    // close the dialog
    this.close()

    event.preventDefault()

    window.history.pushState('', '', event.target.href)

    this.dispatchEvent(
      new CustomEvent('moduleselect', {
        detail: {
          name: event.target.dataset.name,
        },
      })
    )
  }

  keyDownHandler = (event: KeyboardEvent) => {
    const isOpen = (this.refs.dialogEl as HTMLDialogElement).open
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      if (isOpen) {
        this.close()
      } else {
        this.showModal()
      }
    } else {
      // if dialog is open, allow focus shifting using ArrowUp/ArrowDown
      if (isOpen) {
        if (
          this.filteredModules.length > 0 &&
          ['ArrowUp', 'ArrowDown'].includes(event.code)
        ) {
          const elements = this.template.querySelectorAll('a')
          const focusedElement = this.template.querySelector('a:focus')

          // no elements - focus back to the input
          if (!elements) {
            ;(this.refs.inputEl as HTMLInputElement).focus()
            return
          }

          if (!focusedElement) {
            elements[0].focus()
            return
          }

          const focusedElementIndex = Array.from(elements).findIndex(
            (item) => item === focusedElement
          )

          if (event.code === 'ArrowDown') {
            if (focusedElementIndex === elements.length - 1) {
              return
            }

            elements[focusedElementIndex + 1].focus()
          } else if (event.code === 'ArrowUp') {
            if (focusedElementIndex === 0) {
              return
            }
            elements[focusedElementIndex - 1].focus()
          }
        } else if (event.code === 'Enter') {
          // reset the filter value - user has selected an LWC
          this.filterValue = ''
        } else {
          // if typing chars, focus back to the inputEl
          if (!this.template.querySelector('input:focus')) {
            ;(this.refs.inputEl as HTMLInputElement).focus()
          }
        }
      }
    }
  }

  connectedCallback() {
    window.addEventListener('keydown', this.keyDownHandler)
  }
}
