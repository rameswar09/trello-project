import React ,{Component} from 'react';
import './Cards.css'
import Modal from './../modal/Modal.js'

class cards extends Component{
  state={
    cardsData:[],
    delImage:require('./Delete.png'),
    curCardData:[],
    isModalShow:false,
    curCardName:""
  }
  async componentDidMount(){
    let allCardsData =await fetch('https://api.trello.com/1/boards/8YcxH00I/cards/?fields=id,idBoard,idList,name&members=true&member_fields=fullName&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2')
    allCardsData= await allCardsData.json()
    this.setState({cardsData:allCardsData})
  }
  delCardById= async(e)=>{
    console.log(e);
    let finalCardData =this.state.cardsData.filter((item)=>item.id!==e)
    this.setState({cardsData:finalCardData})
    let delCard= await fetch('https://api.trello.com/1/cards/'+e+'?key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'delete'})
     delCard= await delCard.json();
  }
  cardName=(e)=>{
    this.setState({cardName:e.target.value})
  }
  addCard= async (listId,e)=>{
    if(e.keyCode===13){
      let addCardData= await fetch('https://api.trello.com/1/cards?name='+this.state.cardName+'&pos=bottom&idList='+listId+'&keepFromSource=all&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2',{method:'post',header:{'Content-Type':'application/json'}})
      addCardData =await addCardData.json()
      this.state.cardsData.push(addCardData)
      this.setState({cardsData:this.state.cardsData})
    }

  }
   checkList=  async (cardId,cardName)=>{
    let cardDetails = await fetch('https://api.trello.com/1/cards/'+cardId+'/checklists?&key=aa1fdd28be75dfa535d1b8f9d84fee66&token=2b0ac5dfa7ec2a58f3b93046881b38e34433596433f8a3dc67a1d00724544ee2')
    cardDetails = await cardDetails.json();
    this.setState({isModalShow:!this.state.isModalShow,curCardData:cardDetails,curCardName:cardName})
  }
  render(){
    return(
      <div>
      {
        this.state.cardsData.filter((item)=>item.idList===this.props.listId).map((item)=>{
          return(
            <div className="card-div" onClick={(e)=>this.checkList(item.id,item.name)}>
              <p className="card-name">{item.name}<span><img className="delImage" src={this.state.delImage} alt="" onClick={()=>this.delCardById(item.id)}></img></span></p>
          </div>
          )
        })
      }
      <input className="add-new-card" type='text' placeholder="add a new card...." onChange={this.cardName} onKeyUp={(e)=>this.addCard(this.props.listId,e)}/>
      {this.state.isModalShow?<Modal card={this.state.curCardData} cardName={this.state.curCardName}/>:null}
      </div>
    )
  }
}
export default cards
