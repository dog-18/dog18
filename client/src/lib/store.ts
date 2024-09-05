import type { OpenPassport1StepInputs } from '@openpassport/sdk'
import { type Action, action, createStore, createTypedHooks } from 'easy-peasy'

interface StoreModel {
  authorized: {
    data: boolean | null
    set: Action<{ data: boolean }, boolean>
  }
  proof: {
    data: OpenPassport1StepInputs | null
    set: Action<{ data: OpenPassport1StepInputs | null }, OpenPassport1StepInputs | null>
  }
}

const store = createStore<StoreModel>({
  authorized: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
  proof: {
    data: null,
    set: action((state, payload) => {
      state.data = payload
    }),
  },
})

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>()

export { store, useStoreActions, useStoreState }
