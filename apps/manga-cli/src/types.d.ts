declare global {
  var debugEnabled = false;

  interface GlobalInterface {
    value: unknown
  }

  type GlobalType = {
    value: unknown
  }
}

export {}
