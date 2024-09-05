import { useStoreActions, useStoreState } from 'l/store'

export const useStore = () => ({
  authorized: useStoreState(state => state.authorized.data),
  setAuthorized: useStoreActions(actions => actions.authorized.set),
  proof: useStoreState(state => state.proof.data),
  setProof: useStoreActions(actions => actions.proof.set),
})
