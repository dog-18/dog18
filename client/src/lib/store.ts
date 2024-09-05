import type { OpenPassport1StepInputs } from '@openpassport/sdk'
import { type Action, action, createStore, createTypedHooks } from 'easy-peasy'

interface StoreModel {
  proof: {
    data: OpenPassport1StepInputs | null
    set: Action<{ data: OpenPassport1StepInputs }, OpenPassport1StepInputs>
  }
}

const store = createStore<StoreModel>({
  proof: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
})

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>()

export { store, useStoreActions, useStoreState }
