
//发表评价
import React from 'react';
import {Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Header from '../components/Header';
import '../common/css/evaluate.css';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';
import parseQuery from '../common/parseQuery';
const URL=REQUEST_URL+'/upload/';


class Evaluate extends React.Component{
    constructor(props){
        super(props);
        this.state={
           orderDetail:[],
           evaluation:[]
        }
    }

   getCon(id){
    var str=event.target.value;
    var arr=this.state.evaluation;
    var flag=true;
   
    for(var i=0;i<arr.length;i++){
       if(id==arr[i].gId){
          arr[i].con=str;
          flag:false
       }
    }

    var obj={
         gId:id,
         con:str
    }

    if(flag){
       arr.push(obj)
    }

    this.setState({
       evaluation:arr 
    })

     console.log(arr)
      
   }

   //发表评价
   publishEvaluation(){
        var query=parseQuery(window.location.href);
        var order_number=query.orderNumber;

        var _this=this;
        if(this.state.evaluation.length!=this.state.orderDetail.length){
            Toast.fail('评价内容不能为空！',1, null, true);
        }
        else{
             axios.post(REQUEST_URL+'/publishEvaluation',{
		          evaluation:this.state.evaluation,
		          order_number:order_number
		     }).then(function(res){
		          Toast.info(res.data.msg,1, null, true);
		          if(res.data.code==1){
		                _this.props.history.goBack()
		           }
		    }).catch(function(err){
		           console.log(err)
		     })
        }  
   }
    
    componentWillMount(){
        var _this=this;
        var query=parseQuery(window.location.href);
        var order_number=query.orderNumber;
        axios.post(REQUEST_URL+'/orderDetail',{
            order_number:order_number
        }).then(function(res){
            _this.setState({
                orderDetail:res.data.orderDetail
            })
        }).catch(function(err){
             console.log(err)
        })

        
    
    }

     render(){
         return(
             <div className='Evaluate'>
                <div className=''>
                    <Header title='我的评价'/>
                    <div style={{marginTop:60}}>
                       <ul>
                         { this.state.orderDetail.map((item)=>{
                             return(
                                <li>
                                    <img src={URL+item.gPic} className='pho'/>
                                    <span>{item.gName}</span>
                                    <textarea onBlur={this.getCon.bind(this,item.gId)}></textarea>
                                   
                                </li>
                             )
                          })
                            
                         }
                       </ul> 
                        <button onClick={this.publishEvaluation.bind(this)}>发表评价</button>
                    </div>
                </div>
             </div>

         )
     }
}
export default withRouter(Evaluate);
