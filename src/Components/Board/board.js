import React ,{Component} from 'react';
import './board.css'
import List from './../Lists/List.js'
 class board extends Component{
   state={
   }
   async componentDidMount(){
     let data =  await fetch('https://api.trello.com/1/boards/8YcxH00I?fields=all&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2')
     let doc = await data.json()
      let name = doc.name
     this.setState({
       name: name
     })
     console.log(this.state.name);
   }
   render(){
     return(
       <div className="board">
         <span>Board Name :<span/></span><span>{this.state.name}</span>
         <div className="List-div">
            <List/>
         </div>

       </div>
     )
   }
 }

export default board;
