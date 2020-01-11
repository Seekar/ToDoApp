import React, { Component } from 'react';
import {ToDoBanner} from './TodoBanner';
import {ToDoCreator} from './ToDoCreator';
import {ToDoRow} from './ToDoRow';
import {VisibilityControl} from './VisibilityControl';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName : "Ayoub",
      todoItems : [
        {action:"Buy Flowers", done:false},
        {action:"Get Shoes", done:false},
        {action:"Collect Tickets", done:true },
        {action:"Call Joe", done:true}],
      showCompleted : true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  } 

  createNewToDo = (task) => {
    if(!this.state.todoItems.find(item => item.action === task)){
        this.setState({
          todoItems:[...this.state.todoItems,
          {action : task,  done:false}],
        });
    }
  }

  toggleTodo = (todo) => {
    this.setState({
        todoItems : this.state.todoItems.map(item => item.action === todo.action ? 
          {...item, done: !item.done} : item)
    }); 
  }
  

  todoTableRows  = (doneValue)  =>
      this.state.todoItems.filter(item => item.done === doneValue).map(item => 
      <ToDoRow key={item.action} item={item} callback={this.toggleTodo}/>
      ) 
  
  


  render(){
    return (
      <div>
        <ToDoBanner name={ this.state.userName} tasks={this.state.todoItems} />
        <ToDoCreator callback={this.createNewToDo}/>
        <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks"
                    isChecked = {this.state.showCompleted}
                    callback={ (checked) => this.setState({showCompleted : checked})} 
            />
        </div>

        {this.state.showCompleted && 
            <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>{this.todoTableRows(true)}</tbody>
            </table>

        }
        
      </div>
    )
  };

}

