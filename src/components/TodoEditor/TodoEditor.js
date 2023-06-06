import React, { Component } from 'react';
// import './TodoEditor.scss';

class TodoEditor extends Component {
  state = {
    message: '',
  };

  handleChange = e => {
    this.setState({ message: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.message);

    this.setState({ message: '' });
  };

  render() {
    const { message } = this.state;
    const isDisabled = message.trim() === '';
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          className="TodoEditor__textarea"
          value={message}
          onChange={this.handleChange}
        ></textarea>

        <button
          type="submit"
          className="TodoEditor__button"
          disabled={isDisabled}
        >
          Сохранить
        </button>
      </form>
    );
  }
}

export default TodoEditor;
