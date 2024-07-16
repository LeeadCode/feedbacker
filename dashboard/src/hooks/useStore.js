import Store from '../Store'

export default function useStore(module){
  if(module){
    return Store[module]
  }

  return Store
}