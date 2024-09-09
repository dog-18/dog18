import { type Action, action, createStore, createTypedHooks } from 'easy-peasy'
import type { OpenPassport1StepInputs } from 'l/types'

interface StoreModel {
  auth: {
    data: boolean | null
    set: Action<{ data: boolean | null }, boolean | null>
  }

  proof: {
    data: OpenPassport1StepInputs | null
    set: Action<{ data: OpenPassport1StepInputs | null }, OpenPassport1StepInputs | null>
  }
}

const store = createStore<StoreModel>({
  auth: {
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
