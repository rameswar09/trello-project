import React ,{Component} from 'react';
import Cards from './../Cards/Cards.js'
import './List.css'
import './Delete.png'
class list extends Component{
  state={
    data:[],
    addList:"",
    deleteImg:require('./Delete.png'),
    listName:[],
    addListCount:"",
    default:"",
    list:""
  }
   async componentDidMount(){
    let data = await fetch('https://api.trello.com/1/boards/8YcxH00I?fields=id,name&lists=open&list_fields=id,name,closed,idBoard,pos&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2')
     let doc =  await data.json()
     let lists=doc.lists;
     this.setState({
       listName:lists
     })
  }
  addOneList= async(e)=>{
    if(e.keyCode===13){
        let addListOnTheBoard = await fetch('https://api.trello.com/1/lists?name='+e.target.value+'&idBoard=5c10de013d8afd3c71fe8a08&pos=bottom&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'post',header:{'Content-Type':'application/json'}})
         addListOnTheBoard = await addListOnTheBoard.json()
         console.log(this.state.listName);
         this.state.listName.push(addListOnTheBoard)
         this.setState({
           listName:this.state.listName,
           list:""
         })
    }
  }
  handelChange=(e)=>{
    this.setState({list:e.target.value})
  }
 deleteList= async (name,id)=>{
  let finalList =this.state.listName.filter((item)=>item.id!==id)
  this.setState({listName:finalList})
  let upComingList= await fetch('https://api.trello.com/1/lists/'+id+'/closed?key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2&value=true',{method:'put',header:{'Content-Type':'application/json'}})
    upComingList=await upComingList.json();
    console.log(upComingList);
}

  render(){
    return(
      <div className ="list-div">
          {this.state.listName.map((docs)=>{
            return(
              <div className="list">
                <p className="list-name">{docs.name}<span className="img"><img className="deleteImg" src={this.state.deleteImg} alt="" onClick={()=>this.deleteList(docs.name,docs.id)}></img></span></p>
                <Cards listId={docs.id}/>
              </div>
            )
          })}
        <input className="add-list-text" type="text" placeholder="add a list .." value={this.state.list} onChange={this.handelChange} onKeyUp={this.addOneList}/>
      </div>
    );
  }
}
 export default list
