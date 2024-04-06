import { ModuleRecord } from './module-types'

// Garden Config
export interface GardenConfig {
  // defaults to process.cwd()
  rootDir?: string
  ignore?: string[]
  modules: ModuleRecord[]
  theme?: GardenTheme
  // defaults to 3333
  port?: number
  args?: {
    cache?: boolean
  }
  slots?: GardenSlotsConfig
  lwc?: GardenLwcConfig
}

export type GardenArgTypes =
  | 'text'
  | 'color'
  | 'boolean'
  | 'number'
  | 'range'
  | 'select'
  | 'radio'
  | 'inline-radio'
  | 'checkbox'
  | 'inline-checkbox'

export type GardenOption = {
  label: string
  value: string | boolean | number
}

export interface GardenArgType {
  name: string
  type: GardenArgTypes
  min?: number
  max?: number
  step?: number
  options?: GardenOption[]
}

export interface GardenModule {
  LWC: () => Promise<any>
  id: string
  href: string
  label: string
  category: string
  name: string
  argTypes?: GardenArgType[]
  slots?: string[]
  slotComponents?: {
    [key: string]: () => Promise<any>
  }
}

export interface GardenComponentModule {
  name?: string
  argTypes?: GardenArgType[]
  slots?: string[]
  slotComponents?: {
    [key: string]: () => Promise<any>
  }
}

export interface GardenSlotsConfig {
  /**
   * @type {Boolean}[true] - Should slots have their children set
   */
  placeholder?: boolean
  /**
   * Key/value object of slot names and dynamic imports to fill the slots.
   * @example {
   *  default: () => import('test/button'),
   *  slot1: () => import('test/clock'),
   *  slot2: () => import('test/button'),
   * }
   */
  components?: {
    [key: string]: () => Promise<any>
  }
}

export interface GardenLwcConfig {
  /**
   * @deprecated - No longer required. Set this as a part of your lwr.config.json instead
   * @type {Boolean}[false] - Should '@lwc/synthetic-shadow' be disabled
   */
  disableSyntheticShadowSupport?: boolean

  /**
   * When enabled, will load SLDS
   * @type {Boolean}[false] - Should '@salesforce-ux/design-system' assets be loaded
   */
  enableSlds?: boolean
}

export interface GardenTheme {
  light?: GardenThemeProperties
  dark?: GardenThemeProperties
}

export interface GardenThemeProperties {
  'font-family'?: string
  'container-background'?: string
  background?: string
  foreground?: string
  card?: string
  'card-foreground'?: string
  popover?: string
  'popover-foreground'?: string
  primary?: string
  'primary-foreground'?: string
  secondary?: string
  'secondary-foreground'?: string
  muted?: string
  'muted-foreground'?: string
  accent?: string
  'accent-foreground'?: string
  destructive?: string
  'destructive-foreground'?: string
  border?: string
  input?: string
  ring?: string
  radius?: string
  'dialog-background'?: string
  'dialog-background-alpha'?: string
}
