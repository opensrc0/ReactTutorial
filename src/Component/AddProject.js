import React, { Component } from 'react';
import uuid from 'uuid';
class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      "newProject" : {}
    }
  }
  static defaultProps = {
    categories : ["Web Design", "Web Development", "App Developemnt", "Operation"]
  };

  handleSubmit(e) {
    console.log('Submitted');
    if(this.refs.title.value === '') {
      alert('title Required')
    } else {
      this.setState({"newProject" : {
          id: uuid.v4(),
          title : this.refs.title.value,
          category : this.refs.category.value
      }}, function () {
        this.props.addProject(this.state.newProject);
      })
    }
    e.preventDefault();
  }
  render() {
    let categoriesOption = this.props.categories.map(category => {
        return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <h3>AdD project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <label>Title</label><br />
              <input type="text" ref="title" />
            </div>
            <div>
              <label>Category</label><br />
              <select ref="category">
                  {categoriesOption}
              </select>
            </div>
            <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
