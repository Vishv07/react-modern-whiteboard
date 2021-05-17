import React from "react";
import EventBus from "../EventBus/eventBus";
import ToolStore, {
  POINTER,
  PEN,
  LINE,
  ELLIPSE,
  RECT,
  COLOR,
} from "../EventBus/toolStore";
import { FaLocationArrow, FaMinus, FaRegCircle } from "react-icons/fa";
import { BsPencil, BsSquare } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GithubPicker } from "react-color";
import { colors } from "../utils/utils";
const popover = {
  position: "absolute",
  zIndex: "2",
  left: "90px",
  bottom: "-70px",
};
const cover = {
  position: "relative",
};
export default class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
      tools: [
        {
          id: POINTER,
          ICON: <FaLocationArrow size={20} className="arrow" />,
          type: "cursor",
        },
        { id: LINE, ICON: <FaMinus size={22} />, type: "line", selected: true },
        { id: RECT, ICON: <BsSquare size={22} />, type: "rect" },
        { id: ELLIPSE, ICON: <FaRegCircle size={22} />, type: "ellipse" },
        { id: PEN, ICON: <BsPencil size={22} />, type: "pen" },
        {
          id: COLOR,
          ICON: (
            <IoColorPaletteOutline onClick={this.HandleColorPicker} size={24} />
          ),
          type: "COLOR",
        },
      ],
      colorpicker: false,
    };
    ToolStore.subscribe(() => {
      const tools = this.state.tools.map((tool) => ({
        ...tool,
        selected: ToolStore.tool === tool.id,
      }));
      console.log(tools);
      this.setState({ tools });
    });
  }
  HandleColorPicker = () => {
    this.setState({ colorpicker: !this.state.colorpicker }, () => {
      console.log(this.state.colorpicker);
    });
  };
  componentDidMount() {
    document.addEventListener("keydown", this.HandleShortCuts, false);
  }

  HandleShortCuts = (e) => {
    switch (e.keyCode) {
      case 65:
        this.updateState(POINTER);
        break;
      case 76:
        this.updateState(LINE);
        break;
      case 82:
        this.updateState(RECT);
        break;
      case 67:
        this.updateState(ELLIPSE);
        break;
      case 80:
        this.updateState(PEN);
        break;
      default:
        break;
    }
  };

  updateState = (ID) => {
    const tools = this.state.tools.map((tool) => ({
      ...tool,
      selected: ID === tool.id,
    }));
    EventBus.emit(EventBus.TOOL_CHANGE, ID);
    this.setState({ tools });
  };

  handleClick(index) {
    return function () {
      EventBus.emit(EventBus.TOOL_CHANGE, this.state.tools[index].id);
    };
  }

  render() {
    const tools = this.state.tools.map((tool, i) => (
      <div
        key={i}
        onClick={this.handleClick(i).bind(this)}
        className={tool.selected ? "selected" : ""}
      >
        {tool.ICON}
      </div>
    ));
    return (
      <div
        id="tools"
        style={{
          marginLeft: "35px",
          marginTop: "35px",
          backgroundColor: "white",
        }}
      >
        {tools}
        {this.state.colorpicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <GithubPicker
              colors={colors}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
