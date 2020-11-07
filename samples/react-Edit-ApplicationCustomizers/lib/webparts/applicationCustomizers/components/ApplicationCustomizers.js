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
import styles from './ApplicationCustomizers.module.scss';
import { assign } from '@microsoft/sp-lodash-subset';
import ApplicationCustomizersService from "../service/ApplicationCustomizersService";
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import { DefaultButton, TextField, Dialog, DialogFooter, DialogType, List, mergeStyleSets, getFocusStyle, getTheme, IconButton, Panel, PanelType } from 'office-ui-fabric-react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
var Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);
var AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);
var AccordionDetails = withStyles(function (themes) { return ({
    root: {
        padding: themes.spacing(2),
        display: 'block'
    },
}); })(MuiAccordionDetails);
var theme = getTheme();
var palette = theme.palette, semanticColors = theme.semanticColors, fonts = theme.fonts;
var classNames = mergeStyleSets({
    container: {
        overflow: 'auto',
        maxHeight: 500,
    },
    itemCell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            minHeight: 54,
            padding: 10,
            boxSizing: 'border-box',
            borderBottom: "1px solid " + semanticColors.bodyDivider,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    itemImage: {
        flexShrink: 0,
    },
    itemContent: {
        marginLeft: 10,
        overflow: 'hidden',
        flexGrow: 1,
    },
    itemName: [
        fonts.xLarge,
        {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'black'
        },
    ],
    itemIndex: {
        fontSize: fonts.small.fontSize,
        marginBottom: 10,
        color: 'black'
    },
    chevron: {
        alignSelf: 'center',
        marginLeft: 10,
        color: palette.neutralTertiary,
        fontSize: fonts.large.fontSize,
        flexShrink: 0,
    },
});
var applicationCustomizersService = new ApplicationCustomizersService();
var ApplicationCustomizers = /** @class */ (function (_super) {
    __extends(ApplicationCustomizers, _super);
    function ApplicationCustomizers(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (event, item) {
            _this.setState({ selectedItem: item });
            applicationCustomizersService.fetchAllApplictionCustomizers(item.key)
                .then(function (allCustomizers) {
                allCustomizers = allCustomizers.map(function (cus) { return assign(cus, { inEdit: false }); });
                _this.setState({ allCustomizers: allCustomizers });
            }).catch(function (err) {
                console.log(err);
            });
        };
        _this.handleChange = function (panel) { return function (event, newExpanded) {
            _this.setState({ expanded: newExpanded ? panel : false });
        }; };
        _this.editCustomApplication = function (index, inEdit) {
            var allCustomizers = _this.state.allCustomizers;
            allCustomizers[index].inEdit = inEdit;
            if (_this.state.previousEditIndex !== undefined && inEdit) {
                allCustomizers[_this.state.previousEditIndex].inEdit = false;
            }
            if (inEdit) {
                _this.setState({
                    isPanelOpen: _this.props.designType === "List" ? true : false,
                    itemInEdit: index,
                    editJSON: {
                        Title: allCustomizers[index].Title,
                        Description: allCustomizers[index].Description,
                        ClientSideComponentProperties: allCustomizers[index].ClientSideComponentProperties
                    }
                });
            }
            if (!inEdit) {
                _this.setState({ isPanelOpen: false });
            }
            _this.setState({ allCustomizers: allCustomizers, previousEditIndex: index });
        };
        _this.onChangeJSON = function (obj, newValue) {
            var editJSON = _this.state.editJSON;
            editJSON[obj] = newValue;
            _this.setState({ editJSON: editJSON });
        };
        _this.updateCustomizer = function (index) {
            var webURL = _this.state.selectedItem ? _this.state.selectedItem.key : _this.props.context.pageContext.web.absoluteUrl;
            var allCustomizers = _this.state.allCustomizers;
            applicationCustomizersService.updateApplicationCustomizer(webURL, _this.state.allCustomizers[index].Id, _this.state.editJSON)
                .then(function () {
                allCustomizers[index].inEdit = false;
                _this.setState({
                    allCustomizers: allCustomizers,
                    hideDialog: false,
                    isPanelOpen: false,
                    dialogContentProps: {
                        type: DialogType.normal,
                        title: 'Updated Successfully',
                        closeButtonAriaLabel: 'Close',
                        subText: 'Your Customizer is updated. Please refresh the page to look at the changes?'
                    }
                });
            }).catch(function (err) {
                _this.setState({
                    hideDialog: false,
                    dialogContentProps: {
                        type: DialogType.normal,
                        title: 'Updat Error',
                        closeButtonAriaLabel: 'Close',
                        subText: 'There was some error while updating you customizer. Please try again'
                    }
                });
            });
        };
        _this.toggleHideDialog = function () {
            applicationCustomizersService.fetchAllApplictionCustomizers(_this.state.selectedItem ?
                _this.state.selectedItem.key : _this.props.context.pageContext.web.absoluteUrl)
                .then(function (allCustomizers) {
                allCustomizers = allCustomizers.map(function (cus) { return assign(cus, { inEdit: false }); });
                _this.setState({ allCustomizers: allCustomizers, hideDialog: true });
            }).catch(function (err) {
                console.log(err);
            });
        };
        _this.viewCustomApplication = function (index) {
            var allCustomizers = _this.state.allCustomizers;
            _this.setState({
                isViewPanelOpen: true,
                viewJSON: {
                    Title: allCustomizers[index].Title,
                    ClientSideComponentId: allCustomizers[index].ClientSideComponentId,
                    ClientSideComponentProperties: allCustomizers[index].ClientSideComponentProperties,
                    Description: allCustomizers[index].Description,
                    Id: allCustomizers[index].Id
                }
            });
        };
        _this.onRenderCell = function (item, index, isScrolling) {
            return (React.createElement("div", { className: classNames.itemCell, "data-is-focusable": true },
                React.createElement("div", { className: classNames.itemContent },
                    React.createElement("div", { className: classNames.itemName }, item.Title),
                    React.createElement("div", { className: classNames.itemIndex }, item.Description)),
                React.createElement(IconButton, { iconProps: { iconName: 'View' }, onClick: function () { _this.viewCustomApplication(index); }, title: "View", ariaLabel: "View" }),
                React.createElement(IconButton, { iconProps: { iconName: 'Edit' }, onClick: function () { _this.editCustomApplication(index, true); }, title: "Edit", ariaLabel: "Edit" })));
        };
        _this.state = {
            selectedItem: undefined,
            dropdownSites: undefined,
            expanded: 'panel1',
            allCustomizers: [],
            previousEditIndex: undefined,
            hideDialog: true,
            isPanelOpen: false,
            isViewPanelOpen: false
        };
        return _this;
    }
    ApplicationCustomizers.prototype.componentDidMount = function () {
        var _this = this;
        applicationCustomizersService.fetchAllApplictionCustomizers(this.props.context.pageContext.web.absoluteUrl)
            .then(function (allCustomizers) {
            allCustomizers = allCustomizers.map(function (cus) { return assign(cus, { inEdit: false }); });
            _this.setState({ allCustomizers: allCustomizers });
        }).catch(function (err) {
            console.log(err);
        });
        applicationCustomizersService.getAllSiteCollection()
            .then(function (allSites) {
            var dropdownSites = allSites.PrimarySearchResults.map(function (val) {
                val['key'] = val['SPSiteUrl'];
                val['text'] = val['Title'] + " - " + val['SPSiteUrl'];
                return val;
            });
            _this.setState({ dropdownSites: dropdownSites });
        });
    };
    ApplicationCustomizers.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.applicationCustomizers },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("h1", null, this.props.description)),
                React.createElement("div", { className: styles.row },
                    React.createElement(Dropdown, { label: "Select Web", selectedKey: this.state.selectedItem ? this.state.selectedItem.key : undefined, onChange: this.onChange, placeholder: "Select an option", options: this.state.dropdownSites })),
                this.props.designType === "Accordion" && this.state.allCustomizers.length !== 0 &&
                    React.createElement("div", { className: styles.row }, this.state.allCustomizers.map(function (customizer, index) {
                        return (React.createElement(Accordion, { square: true, expanded: _this.state.expanded === "panel" + (index + 1), onChange: _this.handleChange("panel" + (index + 1)) },
                            React.createElement(AccordionSummary, { "aria-controls": "panel1d-content", id: "panel1d-header" },
                                React.createElement("div", null,
                                    customizer.Title,
                                    customizer.Description && " - " + customizer.Description)),
                            React.createElement(AccordionDetails, null,
                                !customizer.inEdit ?
                                    React.createElement("div", null,
                                        React.createElement("div", { className: styles.column2 }, "Component ID"),
                                        React.createElement("div", { className: styles.column }, customizer.ClientSideComponentId),
                                        React.createElement("div", { className: styles.column2 }, "ID"),
                                        React.createElement("div", { className: styles.column }, customizer.Id),
                                        React.createElement("div", { className: styles.column2 }, "Properties"),
                                        React.createElement("div", { className: styles.column }, customizer.ClientSideComponentProperties)) :
                                    React.createElement("div", null,
                                        React.createElement("div", { className: styles.column2 }, "Title"),
                                        React.createElement("div", { className: styles.column },
                                            React.createElement(TextField, { value: _this.state.editJSON.Title, onChange: function (ev, newVal) {
                                                    _this.onChangeJSON("Title", newVal);
                                                } })),
                                        React.createElement("div", { className: styles.column2 }, "Description"),
                                        React.createElement("div", { className: styles.column },
                                            React.createElement(TextField, { value: _this.state.editJSON.Description, multiline: true, rows: 3, onChange: function (ev, newVal) {
                                                    _this.onChangeJSON("Description", newVal);
                                                } })),
                                        React.createElement("div", { className: styles.column2 }, "Properties"),
                                        React.createElement("div", { className: styles.column },
                                            React.createElement(AceEditor, { placeholder: "Placeholder Text", mode: "json", theme: "github", onChange: function (val) { _this.onChangeJSON("ClientSideComponentProperties", val); }, fontSize: 14, style: { height: 200, width: 790 }, showPrintMargin: true, showGutter: true, highlightActiveLine: false, value: _this.state.editJSON.ClientSideComponentProperties, setOptions: {
                                                    enableBasicAutocompletion: true,
                                                    enableLiveAutocompletion: false,
                                                    enableSnippets: false,
                                                    showLineNumbers: true,
                                                    tabSize: 2,
                                                } }))),
                                !customizer.inEdit ?
                                    React.createElement(DefaultButton, { className: styles.button, text: "Edit", onClick: function () { _this.editCustomApplication(index, true); } }) :
                                    [React.createElement(DefaultButton, { className: styles.button, text: "Update", onClick: function () { _this.updateCustomizer(index); } }),
                                        React.createElement(DefaultButton, { style: { marginLeft: 10, marginTop: 10 }, text: "Cancel", onClick: function () { _this.editCustomApplication(index, false); } })])));
                    })),
                this.props.designType === "List" && this.state.allCustomizers.length !== 0 &&
                    React.createElement("div", { className: styles.row },
                        React.createElement(List, { items: this.state.allCustomizers, onRenderCell: this.onRenderCell })),
                this.state.allCustomizers.length === 0 &&
                    React.createElement("div", { className: styles.row }, "Sorry No Application Customizers present for the selected web"),
                React.createElement(Dialog, { hidden: this.state.hideDialog, onDismiss: function () { return _this.toggleHideDialog(); }, dialogContentProps: this.state.dialogContentProps },
                    React.createElement(DialogFooter, null,
                        React.createElement(DefaultButton, { onClick: function () { return _this.toggleHideDialog(); }, text: "Cancel" }))),
                React.createElement(Panel, { headerText: "Edit Application Customizer", isOpen: this.state.isPanelOpen, onDismiss: function () { return _this.setState({ isPanelOpen: false }); }, closeButtonAriaLabel: "Close", type: PanelType.large }, this.state.editJSON &&
                    React.createElement("div", { className: styles.applicationCustomizers },
                        React.createElement("div", { className: styles.column2 }, "Title"),
                        React.createElement("div", { className: styles.column },
                            React.createElement(TextField, { value: this.state.editJSON.Title, onChange: function (ev, newVal) {
                                    _this.onChangeJSON("Title", newVal);
                                } })),
                        React.createElement("div", { className: styles.column2 }, "Description"),
                        React.createElement("div", { className: styles.column },
                            React.createElement(TextField, { value: this.state.editJSON.Description, multiline: true, rows: 3, onChange: function (ev, newVal) {
                                    _this.onChangeJSON("Description", newVal);
                                } })),
                        React.createElement("div", { className: styles.column2 }, "Properties"),
                        React.createElement("div", { className: styles.column },
                            React.createElement(AceEditor, { placeholder: "Placeholder Text", mode: "json", theme: "github", onChange: function (val) { _this.onChangeJSON("ClientSideComponentProperties", val); }, fontSize: 14, style: { height: 200, width: 800 }, showPrintMargin: true, showGutter: true, highlightActiveLine: false, value: this.state.editJSON.ClientSideComponentProperties, setOptions: {
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                } })),
                        React.createElement(DefaultButton, { style: { marginLeft: 10, marginTop: 10 }, className: styles.button, text: "Update", onClick: function () { _this.updateCustomizer(_this.state.itemInEdit); } }),
                        React.createElement(DefaultButton, { style: { marginLeft: 10, marginTop: 10 }, text: "Cancel", onClick: function () { _this.editCustomApplication(_this.state.itemInEdit, false); } }))),
                React.createElement(Panel, { headerText: "View Application Customizer", isOpen: this.state.isViewPanelOpen, onDismiss: function () { return _this.setState({ isViewPanelOpen: false }); }, closeButtonAriaLabel: "Close", type: PanelType.medium }, this.state.viewJSON &&
                    React.createElement("div", { className: styles.applicationCustomizers },
                        React.createElement("div", { className: styles.column2 }, "Title"),
                        React.createElement("div", { className: styles.column }, this.state.viewJSON.Title),
                        React.createElement("div", { className: styles.column2 }, "Description"),
                        React.createElement("div", { className: styles.column }, this.state.viewJSON.Description ? this.state.viewJSON.Description : 'null'),
                        React.createElement("div", { className: styles.column2 }, "ComponentID"),
                        React.createElement("div", { className: styles.column }, this.state.viewJSON.ClientSideComponentId),
                        React.createElement("div", { className: styles.column2 }, "ID"),
                        React.createElement("div", { className: styles.column }, this.state.viewJSON.Id),
                        React.createElement("div", { className: styles.column2 }, "Properties"),
                        React.createElement("div", { className: styles.column }, this.state.viewJSON.ClientSideComponentProperties))))));
    };
    return ApplicationCustomizers;
}(React.Component));
export default ApplicationCustomizers;
//# sourceMappingURL=ApplicationCustomizers.js.map