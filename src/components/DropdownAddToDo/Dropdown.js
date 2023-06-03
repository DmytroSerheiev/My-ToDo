import React, { Component } from "react";
import "./Dropdown.css";
// import TodoEditor from "../TodoEditor";

class Dropdown extends Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    const { visible } = this.state;
    const { children } = this.props;

    return (
      <div className="Dropdown">
        <button
          type="button"
          className="Dropdown__toggle"
          onClick={this.toggle}
        >
          {visible ? "❌" : "➕"}
        </button>

        {visible && (
          <div className="Dropdown__menu">Добавь задачю 👇 {children}</div>
        )}
      </div>
    );
  }
}

export default Dropdown;
