type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type HapticNotification = 'error' | 'success' | 'warning';

export interface HapticFeedback {
  impactOccurred: (style: ImpactStyle) => void;
  notificationOccurred: (type: HapticNotification) => void;
  selectionChanged: () => void;
}
