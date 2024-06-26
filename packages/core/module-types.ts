// Borrowed from '@lwc/module-resolver'
export declare enum RegistryType {
  alias = 'alias',
  dir = 'dir',
}
export interface RegistryEntry {
  entry: string
  specifier: string
  scope: string
  type: RegistryType
  version?: string
}
export interface AliasModuleRecord {
  name: string
  path: string
}
export interface DirModuleRecord {
  dir?: string
  dirs?: string[]
  namespace?: string
}
export interface NpmModuleRecord {
  npm: string
  map?: {
    [key: string]: string
  }
}
export interface ModuleResolverConfig {
  rootDir: string
  modules: ModuleRecord[]
}
export type ModuleRecord = AliasModuleRecord | DirModuleRecord | NpmModuleRecord
export interface LwcConfig {
  modules?: ModuleRecord[]
  expose?: string[]
}
export interface InnerResolverOptions {
  rootDir: string
}
