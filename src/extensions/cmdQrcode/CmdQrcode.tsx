import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { 
    Icon,
    PrimaryButton,
    IconButton,
    DialogFooter,
    DialogContent
} from 'office-ui-fabric-react';

import Download from './download';
import * as strings from 'CmdQrcodeCommandSetStrings';

interface ICmdQrcodeDialogContentProps {
    fileName: string;
    absolutePath: string;
    dataUri:string;
    close: () => void;
  }

  class CmdQrcodeDialogContent extends React.Component<ICmdQrcodeDialogContentProps, {}> { 

    constructor(props) {
        super(props);
    }
  
    public render(): JSX.Element {
        const { absolutePath } = this.props;
        return <DialogContent
        title='QR Code'
        subText={this.props.fileName}
        onDismiss={this.props.close}
        showCloseButton={true}
        >
        <img src={this.props.dataUri} />
        <DialogFooter>
            <IconButton
                ariaLabel={strings.DownloadLabel}
                title={strings.DownloadButtonTitle}
                iconProps={{ iconName: 'Download' }}
                color="primary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { this.btnDownloadClicked(event); }}
                />
            <PrimaryButton 
                text={strings.DownloadLabel}
                title={strings.DownloadButtonTitle} 
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { this.btnDownloadClicked(event); }} 
                />
        </DialogFooter>
        </DialogContent>;
    }

    /**
    * Called when download button is clicked
    * Generates a downloadable PNG file and launches the download process
    */
    private btnDownloadClicked = (_event: React.MouseEvent<HTMLButtonElement>): void => {
        // Generate a data URI for a PNG equivalent of the SVG
        let filename = this.props.fileName.substring(0,this.props.fileName.lastIndexOf("."));
        Download(this.props.dataUri, filename, "image/png");

    }
  }

  export default class QrcodeDialog extends BaseDialog {
    public fileName: string;
    public absolutePath: string;
    public dataUri:string;
  
    public render(): void {
        ReactDOM.render(<CmdQrcodeDialogContent
        close={ this.close }
        fileName={this.fileName}
        absolutePath={this.absolutePath}
        dataUri={this.dataUri}
        />, this.domElement);
    }
  
    public getConfig(): IDialogConfiguration {
        return {
        isBlocking: false
        };
    }
  
    protected onAfterClose(): void {
        super.onAfterClose();
        // Clean up the element for the next dialog
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
  }
