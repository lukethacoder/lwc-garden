import { LightningElement } from 'lwc'

const THEME_COLORS = [
  '--garden-background',
  '--garden-foreground',
  '--garden-card',
  '--garden-card-foreground',
  '--garden-popover',
  '--garden-popover-foreground',
  '--garden-primary',
  '--garden-primary-foreground',
  '--garden-secondary',
  '--garden-secondary-foreground',
  '--garden-muted',
  '--garden-muted-foreground',
  '--garden-accent',
  '--garden-accent-foreground',
  '--garden-destructive',
  '--garden-destructive-foreground',
  '--garden-border',
  '--garden-input',
  '--garden-ring',
]

export default class Theme extends LightningElement {
  get colors() {
    return THEME_COLORS.map((item) => ({
      style: `background-color: hsl(var(${item}));`,
      label: item,
    }))
  }
}
