'use client'
import { ExternalLink } from 'c/ExternalLink'
import { Links } from 'l/constants'
import type { Id } from 'l/types'
import dynamic from 'next/dynamic'
import { BeatLoader } from 'react-spinners'

const OpenPassportQRCode = dynamic(
  () => import('c/QrCode/OpenPassportQrCode').then(({ OpenPassportQRCode }) => OpenPassportQRCode),
  {
    loading: () => (
      <div className='flex items-center justify-center h-[300px] w-[300px]'>
        <BeatLoader loading={true} size={50} color='#e0a3c8' />
      </div>
    ),
    ssr: false,
  },
)

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* FIXME avoid type assertion */}
      <OpenPassportQRCode userId={crypto.randomUUID() as Id} />
      {
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
      }
    </div>
  )
}
