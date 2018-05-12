import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {withRouter} from 'react-router-dom';

import {Toast} from 'antd-mobile';
import '../common/css/login.css';
import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props){
      super(props);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log('Received values of form: ', values);
          var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/; 
          var userName=values.userName;
          var password=values.password;
          var flag_user=true;
          var flag_pass=true;
          var flag_notNull=true;
          if(userName && password){
               flag_notNull=true;
          }
          else{
             flag_notNull=false;
             Toast.fail('登录信息不能为空！', 1, null, true);
          } 

          if(flag_notNull){
             if(!phoneReg.test(userName)){
                flag_user=false;
                Toast.fail('手机号格式不正确！', 1, null, true);
                
             }
             else{
               flag_user=true;
             }
          }

          if(flag_notNull && flag_user){
               axios.post(REQUEST_URL+'/login',{
                  userName:values.userName,
                  password:values.password
                })
                .then(function(res){
                    if(res.data.code==1){
                         Toast.loading('登录中...',2, null, true);
                         setTimeout(function(){
                            window.location.reload()
                         },2000)   
                    }
                    else{
                      Toast.fail(res.data.msg,1, null, true);
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
          }
        
      }
    });
  }
  //跳转区注册页面
  goRegister(e){
    e.preventDefault();
    this.props.history.push("/register");
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
              {getFieldDecorator('userName')(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password')(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码？</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              或 <a  onClick={this.goRegister.bind(this)}>现在注册</a>
            </FormItem>
          </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);
export default withRouter(LoginForm);
