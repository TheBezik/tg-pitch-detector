export interface MainButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isActive: boolean
  readonly isProgressVisile: boolean
  setText: (text: string) => MainButton
  onClick: (callback: () => void) => MainButton
  offClick: (callback: () => void) => MainButton
  show: () => MainButton
  hide: () => MainButton
  enable: () => MainButton
  disable: () => MainButton
  showProgress: (leaveActive: boolean) => MainButton
  hideProgress: () => MainButton
  setParams: (params: Partial<MainButtonParams>) => MainButton
}
