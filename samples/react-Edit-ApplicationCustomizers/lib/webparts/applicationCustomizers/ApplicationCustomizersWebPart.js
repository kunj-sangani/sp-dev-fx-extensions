var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, PropertyPaneChoiceGroup } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ApplicationCustomizersWebPartStrings';
import ApplicationCustomizers from './components/ApplicationCustomizers';
import { sp } from "@pnp/sp/presets/all";
var ApplicationCustomizersWebPart = /** @class */ (function (_super) {
    __extends(ApplicationCustomizersWebPart, _super);
    function ApplicationCustomizersWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationCustomizersWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            // other init code may be present
            sp.setup({
                spfxContext: _this.context
            });
        });
    };
    ApplicationCustomizersWebPart.prototype.render = function () {
        var element = React.createElement(ApplicationCustomizers, {
            description: this.properties.description,
            context: this.context,
            designType: this.properties.designType
        });
        ReactDom.render(element, this.domElement);
    };
    ApplicationCustomizersWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ApplicationCustomizersWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ApplicationCustomizersWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                PropertyPaneChoiceGroup('designType', {
                                    label: strings.DesignFieldLabel,
                                    options: [
                                        { key: 'Accordion', checked: true, text: 'Accordion', iconProps: { officeFabricIconFontName: 'AutoFillTemplate' } },
                                        { key: 'List', text: 'List', iconProps: { officeFabricIconFontName: 'GroupedList' } }
                                    ]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ApplicationCustomizersWebPart;
}(BaseClientSideWebPart));
export default ApplicationCustomizersWebPart;
//# sourceMappingURL=ApplicationCustomizersWebPart.js.map