declare module 'winattr' {
  interface WinAttrs {
    archive?: boolean;
    hidden?: boolean;
    readonly?: boolean;
    system?: boolean;
  };

  export function setSync(path: string, attrs: WinAttrs): void;
}
