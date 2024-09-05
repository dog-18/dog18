import { useStore } from 'hooks/useStore'
import { useVerify } from 'hooks/useVerify'
import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useRouter } from 'next/navigation'
import { type FormEvent, type RefObject, useEffect } from 'react'

export const useSubmitProof = (formRef: RefObject<HTMLFormElement>) => {
  const router = useRouter()
  const { proof } = useStore()
  const { verify, valid, isVerifying } = useVerify()

  useEffect(() => {
    if (proof !== null)
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }, [formRef, proof])

  useEffect(() => {
    if (valid !== true) return
    Cookies.set(config.cookie.name, 'true', { expires: config.cookie.expiresAfterDays })
    router.push('/protected')
  }, [router, valid])

  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (proof === null || isVerifying) return
    await verify()
  }
}
