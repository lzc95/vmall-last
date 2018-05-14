import React from 'react';
import '../common/css/searchCon.css';
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';
import {Modal} from 'antd-mobile';

const alert = Modal.alert;
class searchCon extends React.Component{
    constructor(props){
        super(props);
        this.state={
        	historySearch:[]
        }

    }
    back(){
        this.props.history.goBack() 
    }
    
    search(){
        let url='/searchGoods?key=';
        let key=this.refs.key.value;
        this.props.history.push(url+key);

        //保存搜索记录到localStorage
        var storage=window.localStorage;
        if(key!=''){
        	storage.setItem(key,key);
        }
        
    }
    
    historySearch(key){
         let url='/searchGoods?key=';
         this.props.history.push(url+key);
    }


    clearHistory(){
    	 alert('删除提醒', '确认要删除所有搜索历史记录么?', [
        { text: '取消', onPress: () =>{} },
        { text: '确认', onPress: () =>{
              var storage=window.localStorage;
              storage.clear()

              this.setState({
                 historySearch:[]
              })
          }},
        ])
        
    }

     componentWillMount(){
     	//从localStorage读取搜索记录
         var storage=window.localStorage;
         storage.removeItem('loglevel:webpack-dev-server');

         var arr=[];
         for(var i=0;i<storage.length;i++){
                var key=storage.key(i);
                arr.push(key)
        }

        this.setState({
        	historySearch:arr
        })
    }
    
    render(){
    	const block={display:'block'}
    	const none={display:'none'}
         return(
             <div className="searchCon">
                  <span style={{fontSize:28,position:'fixed',
                    left:0,top:3,zIndex:100,color:'#ccc'}}
                    onClick={this.back.bind(this)}
                    ><img src='/src/common/img/left_s.svg'/></span>
                      <div className='search'>
                        <input placeholder="搜索你要的商品" ref='key' autofocus="autofocus"/>
                      <button className="search_btn" onClick={this.search.bind(this)}>搜索</button>
                  </div>
                  <div className='historySearch'>
                    <ul>
                      {
                          this.state.historySearch.map((item)=>{
                          	return(
                          		<li onClick={this.historySearch.bind(this,item)}>{item}</li>
                          	)
                          })
                      }
                      <button style={this.state.historySearch.length>0?block:none} 
                       onClick={this.clearHistory.bind(this)}><img src="/src/common/img/del.svg"/>清空历史搜索</button>
                    </ul>
                  </div>
             </div>
         )
    }
}

export default searchCon;
