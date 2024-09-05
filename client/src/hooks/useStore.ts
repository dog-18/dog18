import { useStoreActions, useStoreState } from 'l/store'

export const useStore = () => ({
  proof: useStoreState(state => state.proof.data),
  setProof: useStoreActions(actions => actions.proof.set),
})
