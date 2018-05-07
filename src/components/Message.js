
// 消息中心
import React from 'react';
import {withRouter} from 'react-router-dom';
import {WhiteSpace,Button,Modal} from 'antd-mobile';
import Header from '../components/Header';

import '../common/css/message.css'
import axios from 'axios';
import {REQUEST_URL,regDate} from '../common/lib';

const URL=REQUEST_URL+'/upload/';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={
           newsList:[]
        }
    }

  
    componentWillMount(){
       var _this = this;
        axios.get(REQUEST_URL+'/getStatus',{})
        .then(function(res){
            if(res.data.uId !=-1 && !(typeof res.data.uId=='undefined')){
            	 axios.get(REQUEST_URL+'/myNews',{})
		        .then(function(res){
			             _this.setState({
			                 newsList:res.data.newsData
			             })
			    }).catch(function(err){
			        console.log(err)
			    })
		    }
		    else{
		    	_this.props.history.push('/user')
		    }

        }).catch(function(err){
            console.log(err)
        })


       
    }

     render(){
         return(
             <div className='message'>
                <div>
                    <Header title='我的消息'/>
                    <div style={{marginTop:60}}>
                         <ul>
                          {
                            this.state.newsList.map((item)=>{
                                return(
                                    <li key={item.news_id} >
                                       <h3>{item.news_title}</h3>
                                       <p>
	                                       {item.news_con}
	                                       <span className='date'>
                                            {regDate(item.date)}
	                                       </span>
	                                    </p>
                                    </li>

                                )
                               })
                            }
                         </ul>
                        <p style={{color:'#3E90F7',textAlign:'center',marginTop:50}}>***^_^人家也是有底线的^_^***</p>
                    </div>
                </div>
             </div>

         )
     }
}
export default withRouter(Message);
