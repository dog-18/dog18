import QRCode from 'easyqrcodejs'
import type { AppType } from 'l/types'

export function generateQrCode(appData: AppType, size = 256): HTMLElement {
  const qrData = JSON.stringify(appData)
  const options = {
    text: qrData,
    width: size,
    height: size,
  }

  const element = document.createElement('div')
  new QRCode(element, options)

  return element
}
