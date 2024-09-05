import { useStore } from 'hooks/useStore'
import Cookies from 'js-cookie'
import { config } from 'l/config'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'

export const useVerify = () => {
  const { proof, setAuthorized } = useStore()
  const { trigger: verify, data: valid, error, isMutating } = useSWRMutation<boolean>(
    config.verifServerUrl,
    async (url) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proof),
      }).then((res) => res.json()),
  )

  useEffect(() => {
    if (proof !== null) verify()
  }, [proof, verify])

  useEffect(() => {
    if (valid === true) {
      setAuthorized(true)
      Cookies.set(config.cookie.name, JSON.stringify(true), {
        expires: config.cookie.expiresAfterDays,
      })
    }
  }, [valid, setAuthorized])

  return {
    error,
    isVerifying: isMutating,
    valid,
  }
}
