declare interface ICmdQrcodeCommandSetStrings {
  DownloadButtonTitle: string;
  DownloadLabel: string;
  CloseLabel: string;
  FilteredLabel: string;
}

declare module 'CmdQrcodeCommandSetStrings' {
  const strings: ICmdQrcodeCommandSetStrings;
  export = strings;
}
