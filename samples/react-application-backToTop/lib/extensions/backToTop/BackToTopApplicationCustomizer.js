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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import { BackToTop } from "./component/BackToTop";
import * as strings from 'BackToTopApplicationCustomizerStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
var LOG_SOURCE = 'BackToTopApplicationCustomizer';
var topImage = require('./assets/top.png');
var BackToTopApplicationCustomizer = /** @class */ (function (_super) {
    __extends(BackToTopApplicationCustomizer, _super);
    function BackToTopApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackToTopApplicationCustomizer.prototype._onDispose = function () {
        console.log('Disposed custom bottom placeholders.');
    };
    BackToTopApplicationCustomizer.prototype._renderPlaceHolders = function () {
        if (!this._bottomPlaceholder || this._bottomPlaceholder.isDisposed) {
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!this._bottomPlaceholder) {
                console.error("The expected placeholder (Bottom) was not found.");
                return;
            }
            if (this.properties) {
                var width = this.properties.width ? this.properties.width : 64;
                var height = this.properties.height ? this.properties.height : 64;
                var right = this.properties.right ? this.properties.right : 30;
                var bottom = this.properties.bottom ? this.properties.bottom : 60;
                var imageURL = this.properties.imageURL ? this.properties.imageURL : topImage;
                if (this._bottomPlaceholder.domElement) {
                    var element = React.createElement(BackToTop, {
                        width: width,
                        height: height,
                        right: right,
                        bottom: bottom,
                        imageURL: imageURL,
                        isRight: this.properties.isRight
                    });
                    ReactDom.render(element, this._bottomPlaceholder.domElement);
                }
            }
        }
    };
    BackToTopApplicationCustomizer.prototype.onInit = function () {
        var _this = this;
        Log.info(LOG_SOURCE, "Initialized " + strings.Title);
        if (document.querySelectorAll('[role="main"]').length > 0) {
            document.querySelectorAll('[role="main"]')[0]['onscroll'] = (function () {
                if (document.querySelectorAll('[role="main"]')[0].scrollTop > 20) {
                    _this.context.placeholderProvider.changedEvent.add(_this, _this._renderPlaceHolders);
                }
                else {
                    if (_this._bottomPlaceholder) {
                        _this._bottomPlaceholder.dispose();
                        console.log(_this._bottomPlaceholder.isDisposed);
                    }
                }
            });
        }
        return Promise.resolve();
    };
    __decorate([
        override
    ], BackToTopApplicationCustomizer.prototype, "onInit", null);
    return BackToTopApplicationCustomizer;
}(BaseApplicationCustomizer));
export default BackToTopApplicationCustomizer;
//# sourceMappingURL=BackToTopApplicationCustomizer.js.map