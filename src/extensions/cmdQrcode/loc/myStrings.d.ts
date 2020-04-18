declare interface ICmdQrcodeCommandSetStrings {
  CopyBtnTitle: string;
  CopyBtnLabel: string;
  DownloadButtonTitle: string;
  DownloadLabel: string;
  FileNameLabel: string;
  CloseLabel: string;
}

declare module 'CmdQrcodeCommandSetStrings' {
  const strings: ICmdQrcodeCommandSetStrings;
  export = strings;
}
