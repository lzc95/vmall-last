//账户与安全
import React from 'react';
import Header from '../components/Header';
import { List, InputItem, WhiteSpace,Button,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';

import '../common/css/account.css'
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

class AccountSecurity extends React.Component{
      constructor(props){
          super(props);
          this.state={

          }
      }

      go(arg){
          this.props.history.push(arg)
      }

      render(){
        const { getFieldProps } = this.props.form;
          return(
              <div className="account">
                  <div>
                     <Header title="账户与安全"/>
                     <ul className="account_con">
                         <li onClick={this.go.bind(this,'/accountPass')}>账户密码设置</li>
                         <li onClick={this.go.bind(this,'/payPass')}>支付密码设置</li>
                     </ul>
                     {/* <List >
                         <InputItem
                                {...getFieldProps('oldPassword')}
                                clear
                                placeholder="原密码"
                                type="password"
                                ref={el => this.autoFocusInst = el}
                         >原密码</InputItem>
                         <InputItem
                                {...getFieldProps('newPassword')}
                                clear
                                placeholder="密码"
                                type="password"
                                ref={el => this.customFocusInst = el}
                         >新密码</InputItem>
                     </List>
                     <div style={{ width: '70%', color: '#108ee9', textAlign: 'center',marginTop:20,marginLeft:'15%'}}>
                            <Button type="primary" size="small">下一步</Button>
                     </div> */}
                  </div>
              </div>
          )
      }
}

const Account = createForm()(AccountSecurity);
export default Account;
