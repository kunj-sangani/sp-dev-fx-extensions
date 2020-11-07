import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IApplicationCustomizersWebPartProps {
    description: string;
    designType: string;
}
export default class ApplicationCustomizersWebPart extends BaseClientSideWebPart<IApplicationCustomizersWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ApplicationCustomizersWebPart.d.ts.map