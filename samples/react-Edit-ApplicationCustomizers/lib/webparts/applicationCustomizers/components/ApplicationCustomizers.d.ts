import * as React from 'react';
import { IApplicationCustomizersProps } from './IApplicationCustomizersProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
export interface IApplicationCustomizersState {
    selectedItem: IDropdownOption;
    dropdownSites: IDropdownOption[];
    expanded: string | false;
    allCustomizers: any;
    previousEditIndex?: number;
    editJSON?: {
        Title: string;
        Description: string;
        ClientSideComponentProperties: any;
    };
    hideDialog: boolean;
    dialogContentProps?: any;
    isPanelOpen: boolean;
    itemInEdit?: number;
    isViewPanelOpen: boolean;
    viewJSON?: {
        Title: string;
        Description: string;
        ClientSideComponentId: any;
        ClientSideComponentProperties: any;
        Id: any;
    };
}
export default class ApplicationCustomizers extends React.Component<IApplicationCustomizersProps, IApplicationCustomizersState> {
    constructor(props: IApplicationCustomizersProps);
    componentDidMount(): void;
    private onChange;
    handleChange: (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => void;
    editCustomApplication: (index: number, inEdit: boolean) => void;
    onChangeJSON: (obj: string, newValue: string) => void;
    updateCustomizer: (index: number) => void;
    private toggleHideDialog;
    private viewCustomApplication;
    private onRenderCell;
    render(): React.ReactElement<IApplicationCustomizersProps>;
}
//# sourceMappingURL=ApplicationCustomizers.d.ts.map