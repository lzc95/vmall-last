import React from 'react';
import {withRouter} from 'react-router-dom';
import { NavBar, Icon,Popover } from 'antd-mobile';

import '../common/css/head.css'
const Item = Popover.Item;
const myImg = src => <img src={`/src/common/img/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           visible:false,
         };
         this.onSelect=this.onSelect.bind(this);
         this.handleVisibleChange=this.handleVisibleChange.bind(this);
    }

    onSelect(opt){
        var des=opt.props.value;
        this.props.history.push(des) 

        this.setState({
          visible: false,
        });
   };

   handleVisibleChange(visible){
        this.setState({
          visible,
        })
   };

    back(){
        this.props.history.goBack() 
    }


    render(){
        return(
            <div>
                <NavBar className='header'
                    mode="light"
                           
                    rightContent={
                      <Popover mask
                        overlayClassName="fortest"
                        overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={[
                          (<Item key="1" value="/" icon={myImg('index_1')}>首页</Item>),
                          (<Item key="2" value="/message" icon={myImg('message')} >消息</Item>),
                         
                        ]}
                        align={{
                          overflow: { adjustY: 0, adjustX: 0 },
                          offset: [-10, 0],
                        }}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
                      >
                        <div style={{
                          height: '100%',
                          padding: '0 15px',
                          marginRight: '-15px',
                          display: 'flex',
                          alignItems: 'center',
                          color:'#fff'
                        }}
                        >
                          <Icon type="ellipsis" />
                        </div>
                      </Popover>
                    }
        > 
            {this.props.hiddenLeft == 'true' ?'':<span className='left' onClick={this.back.bind(this)}><Icon type='left' size='lg'/></span>}
            {this.props.title}
        </NavBar>
      </div>
      )
    }
}

export default withRouter(Header);
