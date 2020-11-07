import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { IBackToTopProps, BackToTop } from "./component/BackToTop";
import * as strings from 'BackToTopApplicationCustomizerStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';

const LOG_SOURCE: string = 'BackToTopApplicationCustomizer';

const topImage: any = require('./assets/top.png');


export interface IBackToTopApplicationCustomizerProperties {
  width?: number;
  height?: number;
  right?: number;
  bottom?: number;
  imageURL?: string;
  isRight?: boolean;
}


export default class BackToTopApplicationCustomizer
  extends BaseApplicationCustomizer<IBackToTopApplicationCustomizerProperties> {

  private _bottomPlaceholder: PlaceholderContent | undefined;

  private _onDispose(): void {
    console.log('Disposed custom bottom placeholders.');
  }

  private _renderPlaceHolders(): void {
    if (!this._bottomPlaceholder || this._bottomPlaceholder.isDisposed) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let width: number = this.properties.width ? this.properties.width : 64;
        let height: number = this.properties.height ? this.properties.height : 64;
        let right: number = this.properties.right ? this.properties.right : 30;
        let bottom: number = this.properties.bottom ? this.properties.bottom : 60;
        let imageURL: string = this.properties.imageURL ? this.properties.imageURL : topImage;

        if (this._bottomPlaceholder.domElement) {
          const element: React.ReactElement<IBackToTopProps> = React.createElement(
            BackToTop,
            {
              width: width,
              height: height,
              right: right,
              bottom: bottom,
              imageURL: imageURL,
              isRight: this.properties.isRight
            }
          );
          ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
      }
    }
  }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);


    if (document.querySelectorAll('[role="main"]').length > 0) {
      document.querySelectorAll('[role="main"]')[0]['onscroll'] = (() => {
        if (document.querySelectorAll('[role="main"]')[0].scrollTop > 20) {
          this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        } else {
          if (this._bottomPlaceholder) {
            this._bottomPlaceholder.dispose();
            console.log(this._bottomPlaceholder.isDisposed);
          }
        }
      });
    }

    return Promise.resolve();
  }
}
