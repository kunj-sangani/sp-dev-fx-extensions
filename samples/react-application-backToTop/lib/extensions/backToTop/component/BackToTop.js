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
var BackToTop = /** @class */ (function (_super) {
    __extends(BackToTop, _super);
    function BackToTop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.topClick = function () {
            document.querySelectorAll('[role="main"]')[0].scrollTo({ top: 0, behavior: 'smooth' });
        };
        return _this;
    }
    BackToTop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { onClick: function () { _this.topClick(); } }, this.props.isRight ?
            React.createElement("a", { href: "#", style: {
                    position: "fixed",
                    bottom: this.props.bottom,
                    right: this.props.right,
                    width: this.props.width,
                    height: this.props.height,
                    zIndex: 9999,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "opacity 0.3s ease-out",
                    backgroundImage: "url(" + this.props.imageURL + ")"
                } }) :
            React.createElement("a", { href: "#", style: {
                    position: "fixed",
                    bottom: this.props.bottom,
                    left: this.props.right,
                    width: this.props.width,
                    height: this.props.height,
                    zIndex: 9999,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "opacity 0.3s ease-out",
                    backgroundImage: "url(" + this.props.imageURL + ")"
                } })));
    };
    return BackToTop;
}(React.Component));
export { BackToTop };
//# sourceMappingURL=BackToTop.js.map