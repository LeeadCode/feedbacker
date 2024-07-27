import { setApiKey, setcurrentPage,setfingerPrint } from "../store";

interface IFrameControl {
  updateCoreValuesOnStore(): void;
  notifyOpen(): void;
  notifyClose(): void;
}

export default function useIFrameControl(): IFrameControl {
  function updateCoreValuesOnStore() {
    if(process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apiKey = query.get('api_key') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setcurrentPage(page)
      setApiKey(apiKey)
      setfingerPrint(fingerprint)
      return
    }

    setcurrentPage('https://playground.com')
    setApiKey('fcd5015c-10d3-4e9c-b395-ec7ed8850165')
    setfingerPrint('2345678')
  }

  function notifyOpen() {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  function notifyClose() {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  return {
    updateCoreValuesOnStore,
    notifyClose,
    notifyOpen
  }
}