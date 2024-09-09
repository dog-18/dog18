'use client'
import { ExternalLink } from 'c/ExternalLink'
import { Links } from 'l/types'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col gap-y-2 items-center justify-center'>
      <a
        className='underline text-center'
        href="https://en.wikipedia.org/wiki/On_the_Internet,_nobody_knows_you're_a_dog"
        target='_blank'
        rel='noopener noreferrer'
      >
        We won't know if you're a dog
      </a>
      <p className='text-center'>But we will make sure you're 18.</p>
      <p className='text-center'>
        This website demoes gating restricted <s>adult</s>{' '}
        dog content by verifying a privacy-preserving proof of your age with{' '}
        <a className='underline' href='https://openpassport.app' target='_blank' rel='noopener noreferrer'>
          openpasport
        </a>.
      </p>
      <p className='text-center'>
        <b>You won't see any adult content here (just cute puppies' pictures).</b>
      </p>
      <div className='bg-wisteria p-6 rounded-lg shadow-lg space-y-4 text-s mt-10'>
        <h2 className='text-xl font-bold text-violet'>Get Started</h2>
        <ol className='list-decimal list-inside space-y-2'>
          <li>
            Download the OpenPassport mobile app:
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
          </li>
          <li>Add mock or real passport data in the mobile app</li>
          <li>
            <p className='inline'>Then click here to:</p>

            <Link href='/login'>
              <button type='button' className='bg-violet text-lavender hover:bg-pink'>Login</button>
            </Link>
          </li>
          <li>Scan the QR code and trigger the verification with your mobile app</li>
        </ol>
      </div>
    </div>
  )
}
