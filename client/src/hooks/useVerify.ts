import { useStore } from 'hooks/useStore'
import { config } from 'l/config'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'

export const useVerify = () => {
  const { proof } = useStore()
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

  return {
    error,
    isVerifying: isMutating,
    valid,
  }
}
