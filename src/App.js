import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./App.css";
import { TodoForm, TodoList, Footer } from "./components/todo";
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from "./lib/todoHelpers";
import { partial, pipe } from "./lib/utils";
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: ""
  };

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({todos}));
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos })
    destroyTodo(id).then(() => this.showTempMessage('Todo Removed'))

  }

  handleToggle = (id) => {
    const getToggleTodo = pipe(findById, toggleTodo)
    const updated = getToggleTodo(id, this.state.todos)
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
    saveTodo(updated).then(() => this.showTempMessage('Todo updated'))
  }

  handleInputChange = evt => {
    this.setState({ currentTodo: evt.target.value })
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: "",
      errorMessage: ""
    })

    createTodo(newTodo).then(() => this.showTempMessage('Todo Added!'));
  };

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => {
      this.setState({message: ''})
    }, 2500)
  }

  handleEmptySubmit = evt => {
    evt.preventDefault();
    this.setState({
      errorMessage: "Please supply a todo name."
    })
  }

  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;

    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React To-dos</h1>
        </header>
        <div className="Todo-App">
          {this.state.errorMessage && (
            <span className="error">{this.state.errorMessage}</span>
          )}
          {this.state.message && (
            <span className="success">{this.state.message}</span>
          )}
          
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
          <TodoList handleToggle={this.handleToggle} 
            todos={displayTodos} 
            handleRemove={this.handleRemove} 
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
