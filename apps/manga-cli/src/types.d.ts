declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var debugEnabled = false;

  interface GlobalInterface {
    value: unknown
  }

  type GlobalType = {
    value: unknown
  }
}

export {};
