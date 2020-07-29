import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';

import { QRDialog } from './components/QRDialog';

import styles from './CmdQrcodeCommandSet.module.scss';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICmdQrcodeCommandSetProperties {
}

const LOG_SOURCE: string = 'CmdQrcodeCommandSet';

export default class CmdQrcodeCommandSet extends BaseListViewCommandSet<ICmdQrcodeCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CmdQrcodeCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    // Get the command
    const compareOneCommand: Command = this.tryGetCommand('CMD_QR');

    if (compareOneCommand) {
      // This command should be hidden if more than 1 item is selected
      compareOneCommand.visible = event.selectedRows.length < 2;

      // This next part is completely unnecessary! I just do it because I wanted my extension icon to
      // match the theme

      // Escape '#' from Hex colours as they are a reserved character in URLs
      const fillColor: string = styles.iconFill.replace('#', '%23');

      // Set the SVG with the `fill` color set to the current theme color
      compareOneCommand.iconImageUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='32' height='32' viewBox='0 0 401.994 401.994' style='enable-background:new 0 0 401.994 401.994;fill:${fillColor};' xml:space='preserve' %3E %3Cg%3E %3Cg%3E %3Cpath d='M0,401.991h182.724V219.265H0V401.991z M36.542,255.813h109.636v109.352H36.542V255.813z'/%3E %3Crect x='73.089' y='292.355' width='36.544' height='36.549'/%3E %3Crect x='292.352' y='365.449' width='36.553' height='36.545'/%3E %3Crect x='365.442' y='365.449' width='36.552' height='36.545'/%3E %3Cpolygon points='365.446,255.813 328.904,255.813 328.904,219.265 219.265,219.265 219.265,401.991 255.813,401.991 255.813,292.355 292.352,292.355 292.352,328.904 401.991,328.904 401.991,219.265 401.991,219.265 365.446,219.265 '/%3E %3Cpath d='M0,182.728h182.724V0H0V182.728z M36.542,36.542h109.636v109.636H36.542V36.542z'/%3E %3Crect x='73.089' y='73.089' width='36.544' height='36.547'/%3E %3Cpath d='M219.265,0v182.728h182.729V0H219.265z M365.446,146.178H255.813V36.542h109.633V146.178z'/%3E %3Crect x='292.352' y='73.089' width='36.553' height='36.547'/%3E %3C/g%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3Cg%3E %3C/g%3E %3C/svg%3E`;
    }
  }

  @override
  public async onExecute(event: IListViewCommandSetExecuteEventParameters): Promise<void> {
    switch (event.itemId) {
      case 'CMD_QR':
        const { site, list, web } = this.context.pageContext;
        // Get the site url from the page content
        const siteUrl = web.absoluteUrl;

        // Get the relative URL
        const siteRelativeUrl: string = site.serverRelativeUrl;

        // Find where the tenant name ends
        const endIndex = siteUrl.lastIndexOf(siteRelativeUrl);
        
        // Get the root site URL by removing the site name
        const rootSiteUrl = (endIndex > 1) ? siteUrl.substr(0, endIndex) : siteUrl;
                
        // We'll need the file's relative URL, the file name, and absolute URL
        let relativeUrl: string = "";
        let absoluteUrl: string = "";
        let fileName: string = "";

        // See if there is an item currently selected
        if (event.selectedRows.length > 0) {
          // Get FileName
          fileName = event.selectedRows[0].getValueByName('FileLeafRef');
          // If an item is selected, get the selected item's information
          // from JSON of field "=if(indexOf([$ContentTypeId], '0x0120') >= 0, '?id=' + [$FileRef], @currentWeb + '/_layouts/15/Doc.aspx?sourcedoc='+ [$UniqueId] + '&action=View')
          if (event.selectedRows[0].getValueByName('ContentTypeId').indexOf("0x0120") >= 0) {
            // Item is a folder
            relativeUrl = '?id='+ event.selectedRows[0].getValueByName('FileRef');
          }
          else {
            // Item is a file. Returns file url with id
            relativeUrl = encodeURI('/_layouts/15/Doc.aspx?sourcedoc='+ event.selectedRows[0].getValueByName('UniqueId')) + '&action=View';
          }
          absoluteUrl = `${siteUrl}${relativeUrl}`;
        } else {
          let listFilter: string = "";
          // If no item is selected, get the link to the list and capture eventual filters
          fileName = list.title;
          listFilter = (window.location.href.lastIndexOf("FilterField1")!== -1)? '?'+ window.location.href.substring(window.location.href.lastIndexOf("FilterField1")):'';
          relativeUrl = encodeURI(this.context.pageContext.legacyPageContext['listUrl']) + listFilter;
          absoluteUrl = `${rootSiteUrl}${relativeUrl}`;
        }

        console.log("fileName->"+fileName+"\nrootSiteUrl->"+rootSiteUrl+"\nsiteUrl->"+siteUrl+"\nsiteRelativeUrl->"+siteRelativeUrl+"\nrelativeUrl->"+relativeUrl+"\nabsoluteUrl->"+absoluteUrl);
        
        // Build a callout dialog
        const callout: QRDialog = new QRDialog();
        callout.fileName = fileName;
        callout.absolutePath = absoluteUrl;
        callout.show();
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}

