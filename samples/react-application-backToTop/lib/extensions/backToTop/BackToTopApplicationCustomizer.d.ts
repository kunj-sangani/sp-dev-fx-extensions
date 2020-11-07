import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
export interface IBackToTopApplicationCustomizerProperties {
    width?: number;
    height?: number;
    right?: number;
    bottom?: number;
    imageURL?: string;
    isRight?: boolean;
}
export default class BackToTopApplicationCustomizer extends BaseApplicationCustomizer<IBackToTopApplicationCustomizerProperties> {
    private _bottomPlaceholder;
    private _onDispose;
    private _renderPlaceHolders;
    onInit(): Promise<void>;
}
//# sourceMappingURL=BackToTopApplicationCustomizer.d.ts.map