import { setCurrentComponent, setfeedbackType, initialState as storeInitialState} from "../store"
import useStore from "./store"

export interface Navigation {
  next(): void,
  back(): void,
  setErrorState(): void,
  setSuccesState(): void
}

export default function useNavigation (): Navigation {
  const store = useStore()

  function setSuccesState(){
    setCurrentComponent('Success')
  }

  function setErrorState(){
    setCurrentComponent('Error')
  }

  function next () {
    if(store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteFeedback')
    }
  }

  function back () {
    if(store.currentComponent === 'WriteFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setfeedbackType(storeInitialState.feedbackType)
    }
  }

  return {next, back, setErrorState, setSuccesState}
}