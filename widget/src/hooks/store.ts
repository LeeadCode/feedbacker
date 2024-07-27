import store from "../store";

export default function useStore(): typeof store {
  return store
}

const teste = useStore()