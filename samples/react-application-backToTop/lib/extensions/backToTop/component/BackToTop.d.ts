import * as React from 'react';
export interface IBackToTopProps {
    width?: number;
    height?: number;
    right?: number;
    bottom?: number;
    imageURL?: string;
    isRight?: boolean;
}
export declare class BackToTop extends React.Component<IBackToTopProps, {}> {
    topClick: () => void;
    render(): React.ReactElement<IBackToTopProps>;
}
//# sourceMappingURL=BackToTop.d.ts.map