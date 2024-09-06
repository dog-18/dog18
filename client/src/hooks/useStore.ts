import { useStoreActions, useStoreState } from 'l/store'

export const useStore = () => ({
  auth: useStoreState(state => state.auth.data),
  proof: useStoreState(state => state.proof.data),
  setAuth: useStoreActions(actions => actions.auth.set),
  setProof: useStoreActions(actions => actions.proof.set),
})
