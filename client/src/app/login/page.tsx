'use client'
import { ExternalLink } from 'c/ExternalLink'
import { Links } from 'l/constants'
import type { Id } from 'l/types'
import dynamic from 'next/dynamic'

const OpenPassportQRCode = dynamic(
  () => import('c/QrCode/OpenPassportQrCode').then(({ OpenPassportQRCode }) => OpenPassportQRCode),
  { ssr: false },
)

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* FIXME avoid type assertion */}
      <OpenPassportQRCode userId={crypto.randomUUID() as Id} />
      <div>
        <p className='text-center'>Scan this 👆</p> With your OpenPassport mobile app:
        <ExternalLink
          className='underline ml-2'
          href={Links.IOS_APP}
        >
          iOS
        </ExternalLink>
        <ExternalLink
          className='underline ml-2'
          href={Links.ANDROID_APP}
        >
          Android
        </ExternalLink>
      </div>
    </div>
  )
}
