import * as React from 'react';

export interface IBackToTopProps {
    width?: number;
    height?: number;
    right?: number;
    bottom?: number;
    imageURL?: string;
    isRight?: boolean;
}



export class BackToTop extends React.Component<IBackToTopProps, {}> {

    public topClick = () => {
        document.querySelectorAll('[role="main"]')[0].scrollTo({ top: 0, behavior: 'smooth' });
    }

    public render(): React.ReactElement<IBackToTopProps> {
        return (
            <div onClick={() => { this.topClick(); }}>
                {this.props.isRight ?
                    <a href="#" style={{
                        position: "fixed",
                        bottom: this.props.bottom,
                        right: this.props.right,
                        width: this.props.width,
                        height: this.props.height,
                        zIndex: 9999,
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "opacity 0.3s ease-out",
                        backgroundImage: `url(${this.props.imageURL})`
                    }} /> :
                    <a href="#" style={{
                        position: "fixed",
                        bottom: this.props.bottom,
                        left: this.props.right,
                        width: this.props.width,
                        height: this.props.height,
                        zIndex: 9999,
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "opacity 0.3s ease-out",
                        backgroundImage: `url(${this.props.imageURL})`
                    }} />
                }
            </div>
        );
    }
}
