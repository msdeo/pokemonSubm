import React, { Component } from 'react';
import './App.css';
import Cards from './components/card';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {value:'',
                  item: null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    this.callBackendAPI(this.state.value)
        .then(res => this.setState({item: res.data}))
        .catch(err => console.log(err));
  }
  handleSubmit(event){
    this.callBackendAPI(this.state.value)
        .then(res => this.setState({item: res.data}))
        .catch(err => console.log(err));
    event.preventDefault();
  }
  // componentDidMount() {
  //     this.callBackendAPI(this.state.value)
  //       .then(res => this.setState({item: res.data}))
  //       .catch(err => console.log(err));
  // }

  callBackendAPI = async(req,res) =>{
    const response = await fetch('/pokemon/'+req);
    const body = await response.json();
    console.log(body);
    if(response.status !==200){
      throw Error(body.message)
    }
    return body;
  };
  render(){
  return (
    <div className="App">
   
       <form onSubmit={this.handleSubmit}>
        <label>
          <input type='text' value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type='submit' value="submit" />
       </form>
      {/* <p className='App-intro'>{this.state.item?"set "+ this.state.item['weight']: "not set"}</p> */}
      <div className='App-intro'>{
      this.state.item
        ?<Cards data={this.state.item}/>
        :"Please type a pokemon's name in search box"
        }</div>

   
    </div>
  );
}
}

export default App;
