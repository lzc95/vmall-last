import React from 'react';
import Header from '../components/Header';
import { Carousel, WhiteSpace, WingBlank,Icon} from 'antd-mobile';
import Banner from '../components/Banner';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';
import '../common/css/home.css';
const URL=REQUEST_URL+'/upload/';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: ['1', '2', '3'],
            imgHeight: 176,
            slideIndex: 0,
            list:[],
            bestSellingList:[]
        }
    }

    goDetail(arg){
        let url='/goodsDetail?gId='
        this.props.history.push(url+arg)
    }
    

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['carousel_1','carousel_2','carousel_3'],
          });
        }, 100)
        var _this=this;

        //获取最新上架14件商品
        axios.get(REQUEST_URL+'/newGoods')
        .then(function(res){
             _this.setState({
                 list:res.data.goodsList
             })
        }).catch(function(err){
            console.log(err)
        })

        //获取畅销产品10件
        axios.get(REQUEST_URL+'/bestSelling')
        .then(function(res){
             _this.setState({
                 bestSellingList:res.data.goodsList
             })
        }).catch(function(err){
            console.log(err)
        })

      
    }
    
    render(){
        return(
            <div className='home'> 
              <div className="inlineBox">
                <Header title="开心购物街"  hiddenLeft='true'/>
                <Carousel
                   autoplay={true}
                   infinite
                   selectedIndex={1}
                   style={{width:'100%',marginTop:45}}
                   >
                    {this.state.data.map(val => (
                       <a
                       key={val}
                       href="#"
                       style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                       >
                       <img
                           src={`/src/common/img/${val}.jpg`}
                           alt=""
                           style={{ width:'100%', height:204,verticalAlign: 'top' }}
                           onLoad={() => {
                           // fire window resize event to change height
                           window.dispatchEvent(new Event('resize'));
                           this.setState({ imgHeight: 'auto' });
                           }}
                       />
                       </a>
                   ))}
                </Carousel>
                <ul className='info'>
                   <li><img src="/src/common/img/circle_ok.svg"/>自营品牌</li>
                   <li><img src="/src/common/img/circle_ok.svg"/>无忧退货</li>
                   <li><img src="/src/common/img/circle_ok.svg"/>极速退款</li>
                </ul>
                <Banner/>
                <div className='new'>
                    <p className='title'><img src="/src/common/img/hot.svg"/>新品上市</p>
                     <ul>
                         {
                            this.state.list.map((item)=>{
                                return(
                                    <li key={item.gId} onClick={this.goDetail.bind(this,item.gId)}>
                                        <img src={URL+item.gPic}/>
                                        <p>{item.gName}</p>
                                        <p className="price">¥{item.gPrice}</p>
                                   </li>
                                )
                            })
                         }
                     </ul>
                </div>

                <p style={{clear:'left'}}></p>
                <div className='new'>
                    <p className='title' style={{marginTop:10,marginBottom:20}}><img src="/src/common/img/hot.svg"/>热销排行</p>
                     <ul>
                         {
                            this.state.bestSellingList.map((item)=>{
                                return(
                                    <li key={item.gId} onClick={this.goDetail.bind(this,item.gId)}>
                                        <img src={URL+item.gPic}/>
                                        <p>{item.gName}</p>
                                        <p className="price">¥{item.gPrice}</p>
                                   </li>
                                )
                            })
                         }
                     </ul>
                </div>
                <p style={{clear:'left'}}></p>
                <p style={{color:'#3E90F7',textAlign:'center',marginTop:30,marginBottom:80}}>***^_^人家也是有底线的^_^***</p>
                
              </div>  
            </div>
        )
    }
}

export default Home;
