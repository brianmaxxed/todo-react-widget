/* eslint no-useless-escape: 0  */
import React, {Component} from "react";
import "./TodoWidget.css";

export default class Moderator extends Component {
  constructor(props) {
      super(props);

      this.state = {
        todos: [],
        todoInput: '',
        invalid: '',
        errorMsg: '',
      }
  }

  updateInput(e) {
    this.setState({todoInput: e.target.value, invalid: '', errorMsg: ''});
  }

  newTodo(key, val) {
    return (<li key={key} data-index={key}>
      <span>{val}</span>
      <button onClick={this.deleteTodo.bind(this)}>-</button>
    </li>);
  }

  validInput(val) {
    if (val.trim() === '') {
      return false;
    }

    let rx = new RegExp(/^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/);
    const out = !rx.test(val);
    return out;
  }

  addTodo(e) {
    e.preventDefault();

    if (this.state.todoInput === '') {
      this.setState({invalid: 'invalid', errorMsg: 'todo can\'t be empty.'});
      return;
    } else if (!this.validInput(this.state.todoInput)) {
      this.setState({invalid: 'invalid', errorMsg: 'no invalid input.'});
      return;
    }

    const todos = Object.assign([], this.state.todos);
    todos.push(this.newTodo(todos.length, this.state.todoInput));
    this.setState({todos, todoInput: '', invalid: '', errorMsg: ''});
  }

  deleteTodo(e) {
    e.preventDefault();
    const todos = Object.assign([], this.state.todos);

    todos.splice(e.target.parentElement.dataset.index, 1);
    todos.forEach((item, idx) => {
      todos[idx] = this.newTodo(idx, item.props.children[0].props.children);
    });

    this.setState({todos});
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.todoInput === '') {
      this.setState({invalid: '', errorMsg: ''});
    }

    const todos = this.state.todos.map(t => t.props.children[0].props.children);
    console.log(todos);
  }

  render() {
    return (<div className="TodoWidget">
      <form name="todoForm">
        <div className="heading">
          <input type="text" onChange={this.updateInput.bind(this)} value={this.state.todoInput} className={`todoInput ${this.state.invalid}`} />
          <button onClick={this.addTodo.bind(this)} value="" className="addButton">+</button>
          <button onClick={this.submitForm.bind(this)} value="" className="submitButton">Submit</button>
        </div>
        <div className={this.state.errorMsg > '' ? 'error errorOff' : 'error errorOn'}>{this.state.errorMsg}</div>
        <ul className="todoBody">
          {this.state.todos}
        </ul>
      </form>
    </div>)
  };
};
