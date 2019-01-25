import React ,{Component} from 'react'
import './Modal.css'
class checkItem extends Component{
  state={
    checkItemsData:this.props.cardData.checkItems,
    checkListId :this.props.cardData.id,
    addCheckItemName:"",
    delImage:require('./Delete.png')
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
  changeState=async(e)=>{
    console.log('hello');
    if(e.state==="incomplete"){
      console.log(e);
      console.log('incomplete');
        let changeStateOfcheckItem = await fetch('https://api.trello.com/1/cards/'+this.props.cardId+'/checkItem/'+e.id+'?state=complete&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'put'})
         changeStateOfcheckItem =await changeStateOfcheckItem.json()
         console.log(changeStateOfcheckItem);
         console.log(this.state.checkItemsData);
         let array=this.state.checkItemsData.map((item)=>{
           if(item.id===e.id)
           item.state=changeStateOfcheckItem.state
           return item
         })
         console.log(array);
         this.setState({
           checkItemsData:array
         })
    }else{
      console.log(e);
      console.log('complete');
      let changeStateOfcheckItem = await fetch('https://api.trello.com/1/cards/'+this.props.cardId+'/checkItem/'+e.id+'?state=incomplete&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'put'})
       changeStateOfcheckItem =await changeStateOfcheckItem.json()
       console.log(changeStateOfcheckItem);
       console.log(this.state.checkItemsData);
       let array=this.state.checkItemsData.map((item)=>{
         if(item.id===changeStateOfcheckItem.id)
           item.state=changeStateOfcheckItem.state
           return item
       })
       console.log(array);
       this.setState({
         checkItemsData:array
       })
    }


  }
render(){
  return(
    <div className="checkItem-box">
      {
        this.state.checkItemsData.map((item)=>{
          console.log(this.state.checkItemsData)
          console.log(item);

          return <p><span><input type="checkbox"  onChange={()=>this.changeState(item)}></input></span>{item.name}<span><img className="delImage" src={this.state.delImage} alt="" onClick={(e)=>this.deleteCheckItem(item.id)}></img></span></p>
        })
      }
      <input className="add-check-item-input" type="text" placeholder="add a Check Item...." onChange={this.addCheckItemsName} onKeyUp={this.addCheckItem}></input>
    </div>
  )
}

}

export default checkItem
