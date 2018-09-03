import React, {Component} from 'react';
import './App.css';

class ToDoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [
				{
					text: "Take out the trash",
					done: false,
					id: 0
				},
				{
					text: "Earn my first million",
					done: false,
					id: 1
				},
				{
					text: "Crossfit",
					done: true,
					id: 2
				},
			],
			text: '',
			choice: false
		};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChoice = this.handleChoice.bind(this);
	}
	handleTextChange(text) {
		this.setState({text: text});
	}
	handleAdd(e) {
		e.preventDefault();
		if(!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			done: false,
			id: Date.now()
		};
		this.setState(prevState => ({
			tasks: prevState.tasks.concat(newItem),
			text: ''
		}));
	}
	handleChange(id) {
		var index = this.state.tasks.findIndex(task => (task.id == id));
			this.state.tasks[index].done = true;
			this.forceUpdate();
	}
	handleChoice(choice) {
		this.setState({choice: choice});
	}
	render() {
		return ( 
			<div className = "App" >
				<header className = "App-header" >
					<h1 className = "App-title" > To Do List </h1>
				</header > 
				<ChoiceBar 
					choice = {this.state.choice}
					onChoice = {this.handleChoice} />
				<TaskTable 
					tasks = {this.state.tasks}
					choice = {this.state.choice}
					onChange = {this.handleChange} />
				<AddBar 
					text = {this.state.text} 
					onTextChange={this.handleTextChange}
					onAdd={this.handleAdd} />
			< /div>
		);
	}
}
				
class TaskTable extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	render() {
		var list = [];
		{this.props.tasks.map(task => {
			if(!this.props.choice && task.done === true){
				return;
			}
			else{
				list.push(
					<li key = {task.id}> 
						<input 
							type = "checkbox" 
							key = {task.id}
							id = {task.id}
							checked = {task.done}
							onChange = {this.handleChange} /> 
						{task.text}
					</li>
				);
			}
		})}
		return (
			<ul>{list}</ul>
		)
	}
	handleChange(e) {
		this.props.onChange(e.target.id);
	}
}

class AddBar extends Component {
	constructor(props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleTextChange(e) {
		this.props.onTextChange(e.target.value);
	}
	handleAdd(e) {
		this.props.onAdd(e);
	}
	render() {
		return ( 
			<form onSubmit={this.handleAdd}>
				<input
					type = "text"
				   	placeholder = "Write new task..."
					value={this.props.text}
					onChange={this.handleTextChange}/>
				<button> Add < /button> 
			< /form> 
		)
	}
}

class ChoiceBar extends Component {
	constructor(props) {
		super(props);
		this.handleChoice = this.handleChoice.bind(this);
	}
	handleChoice(e) {
		this.props.onChoice(e.target.checked);
	}
	render() {
		return ( 
			<div>
				<input 
					type = "checkbox" 
					checked = {this.props.choice} 
					onChange = {this.handleChoice} />
				<b>Show completed tasks</b>
			</div>
		)
	}
}
				
export default ToDoApp;