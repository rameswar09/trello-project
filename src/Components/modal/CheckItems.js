import React ,{Component} from 'react'
import './Modal.css'
// import CheckBox from './checkbox.js'
class checkItem extends Component{
  state={
    checkItemsData:this.props.cardData.checkItems,
    checkListId :this.props.cardData.id,
    addCheckItemName:"",
    delImage:require('./Delete.png')
  }
  async componentDidMount(){
    let checkItemsData = await fetch('https://api.trello.com/1/checklists/'+this.state.checkListId+'/checkItems?key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2')
    checkItemsData =await checkItemsData.json()
    this.setState({
      checkItemsData
    })
    console.log(checkItemsData);

  }
  addCheckItemsName=(e)=>{
    this.setState({addCheckItemName:e.target.value})
  }
  addCheckItem= async (e)=>{
    if(e.keyCode===13){
      let addCheckItemData = await fetch('https://api.trello.com/1/checklists/'+this.state.checkListId+'/checkItems?name='+this.state.addCheckItemName+'&pos=bottom&checked=false&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'post'})
      addCheckItemData =await addCheckItemData.json()
      this.state.checkItemsData.push(addCheckItemData)
      this.setState({checkItemsData:this.state.checkItemsData})
    }
  }
  deleteCheckItem= async (checkItemId)=>{
    let finalDeleteCheckItemDataArray =this.state.checkItemsData.filter((item)=>item.id!==checkItemId)
    this.setState({checkItemsData:finalDeleteCheckItemDataArray})
    let deleteCheckItemFromTheList = await fetch('https://api.trello.com/1/checklists/'+this.state.checkListId+'/checkItems/'+checkItemId+'?key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'delete'})
    deleteCheckItemFromTheList = await deleteCheckItemFromTheList.json()
    console.log(deleteCheckItemFromTheList);
  }
render(){
  return(
    <div className="checkItem-box">
      {
        this.state.checkItemsData.map((item)=>{
          return(
            <p>{item.name}<span><img className="delImage" src={this.state.delImage} alt="" onClick={(e)=>this.deleteCheckItem(item.id)}></img></span></p>
           )
        })
      }
      <input className="add-check-item-input" type="text" placeholder="add a Check Item...." onChange={this.addCheckItemsName} onKeyUp={this.addCheckItem}></input>
    </div>
  )
}

}

export default checkItem
// <form>
// <input type="checkbox"value={item.name}>{item.name}</input>
// </form>
