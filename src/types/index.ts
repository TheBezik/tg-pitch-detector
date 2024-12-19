import { HapticFeedback } from './HapticFeedback'
import { PopupParams } from './PopupParams'
import { ThemeParams } from './ThemeParams'
import { BackButton } from './BackButton'
import { MainButton } from './MainButton'
import { VoidHandler } from './Handlers'

export type TelegramEvents = 'viewportChanged' | 'themeChanged'

type TelegramEventCallback<T extends TelegramEvents> = T extends 'themeChanged'
  ? () => void
  : (isStateStable: boolean) => void

type TelegramEvent<T extends TelegramEvents> = (
  event: TelegramEvents,
  callback: TelegramEventCallback<T>
) => void

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        version: string
        platform: string
        showPopup: (params: PopupParams) => void
        HapticFeedback: HapticFeedback
        themeParams: ThemeParams
        colorScheme: 'light' | 'dark'
        headerColor: string
        backgroundColor: string
        BackButton: BackButton
        MainButton: MainButton
        onEvent: TelegramEvent<TelegramEvents>
        offEvent: TelegramEvent<TelegramEvents>
        openTelegramLink: (url: string) => void
        close: VoidHandler
        expand: VoidHandler
        setHeaderColor: (color: string) => void
        requestFullscreen: VoidHandler
        viewportHeight: number
      }
    }
  }
}

export type HapticNotification = 'error' | 'success' | 'warning'

export { type VoidHandler } from './Handlers'
