import QRCode from 'easyqrcodejs'
import type { AppType } from 'l/types'

export function generateQrCode(appData: AppType, size = 256): HTMLElement {
  const options = {
    text: JSON.stringify(appData),
    width: size,
    height: size,
  }

  const element = document.createElement('div')
  new QRCode(element, options)

  return element
}
