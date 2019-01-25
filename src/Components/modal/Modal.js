import React ,{Component} from 'react';
import './Modal.css'
import CheckItems from './CheckItems.js'
class modal extends Component{
   modalClass=["modal"]
  state={
    cardsData:this.props.card,
    isCloseModal:true,
  }
  closeModal=(e)=>{
  this.setState({isCloseModal:false})
  }
  render(){
    var modalClass
    this.state.isCloseModal?modalClass=["modal"]:modalClass=["modal-close"]
    console.log(this.state.cardsData);
    return(
      <div className={modalClass}>
        <div className="modal-content">
         <span>card Name :</span><span>{this.props.cardName}</span><span className="close" onClick={this.closeModal}>&times;</span>
         {
           this.state.cardsData.map((item)=>{
             return(
               <div className="check-list-box">
                 <p><span>Check List Name: </span>{item.name}</p>
                 <CheckItems cardData={item} cardId={item.idCard}/>
             </div>

             )
           })
         }
        </div>
      </div>
    )
  }
}
export default modal
