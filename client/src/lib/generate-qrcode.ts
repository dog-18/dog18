import QRCode from 'easyqrcodejs'
import type { AppType } from 'l/types'

export function generateQrCode(appData: AppType, size = 256): HTMLElement {
  const options = {
    backgroundImage: '/pawprint-violet.png',
    backgroundImageAlpha: 0.7,
    colorDark: '#9f84bd',
    colorLight: '#ede3e9',
    text: JSON.stringify(appData),
    width: size,
    height: size,
  }

  const element = document.createElement('div')
  new QRCode(element, options)

  return element
}
