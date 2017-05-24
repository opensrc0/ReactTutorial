import React, { Component } from 'react';
import Projects from './Component/Project';
import AddProject from './Component/AddProject';
import uuid from 'uuid'
import $ from 'jquery';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			"projects" : [],
			"todos" : []
		}
	}

	getTodos() {
		$.ajax({
			url : 'htpps://jsonplaceholder.typicode.com/todos',
			dataType : 'json',
			cashe : false,
			success : function(data) {
				this.setState({todos : data}, function(){
					console.log(this.state);
				});
			}.bind(this),
				error : function (xhr, status, err) {
				console.log(err);
			}
		})
	}

	getProjects() {
	this.setState({projects : [
		{
			id: uuid.v4(),
			title : "Bussiness Website",
			category : "Web Design"
		},
		{
			id: uuid.v4(),
			title : "Social App",
			category : "Mobile Development"
		},
		{
			id: uuid.v4(),
			title : "E commerce",
			category : "Web Development"
		},
		{
			id: uuid.v4(),
			title : "Bussiness Websites",
			category : "Web Design"
		}
	]});
	}

	// 
	componentWillMount() {
		this.getProjects();
		this.getTodos();
		alert('componentWillMount:- Before First render');
	}

	componentDidMount() {
		this.getTodos();
		alert('componentDidMount:- After First render');
	}

	componentWillUpdate(nextProps, nextState) {
		alert('componentWillUpdate:- On state changes render() fn call so run before calling render');
	}

	componentDidUpdate (nextProps, nextState) {
		alert('componentDidUpdate:- On state changes render() fn ');
	}

	handleAddProject(project) {
		console.log(project);
		let projects = this.state.projects;
		projects.push(project);
		this.setState(projects);
	}

	handleOnDelete(id) {
		let projects = this.state.projects;
		let index = projects.findIndex(x => x.id === id);
		projects.splice(index, 1);
		this.setState({projects: projects});
	}

	render() {
		return (
			<div className="App">
				<AddProject addProject={this.handleAddProject.bind(this)} />
				<Projects onDelete={this.handleOnDelete.bind(this)} projects={this.state.projects} />
			</div>
		);
	}
}

export default App;
