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
      }
  }

  updateInput(e) {
    this.setState({todoInput: e.target.value});
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

    if (!this.validInput(this.state.todoInput)) {
      this.setState({invalid: 'invalid'});
      return;
    } else if (this.state.invalid !== '') {
        this.setState({invalid: ''});
    }

    this.state.todos.push(this.newTodo(this.state.todos.length, this.state.todoInput));
    this.setState({todos: this.state.todos, todoInput: ''});
  }

  deleteTodo(e) {
    e.preventDefault();
    const todos = this.state.todos;

    todos.splice(e.target.parentElement.dataset.index, 1);
    todos.forEach((item, idx) => {
      todos[idx] = this.newTodo(idx, item.props.children[0].props.children);
    });

    this.setState(todos);
  }

  submitForm(e) {
    e.preventDefault();
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
        <ul className="todoBody">
          {this.state.todos}
        </ul>
      </form>
    </div>)
  };
};
