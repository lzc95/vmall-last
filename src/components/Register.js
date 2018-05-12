import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Toast } from 'antd-mobile';
import {withRouter} from 'react-router-dom';

import '../common/css/login.css';

import axios from 'axios';
import {REQUEST_URL} from '../common/lib';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  goLogin(e){
    e.preventDefault();
    this.props.history.push('/user')
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log('Received values of form: ', values);
          var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/; 
          var nickName=values.nickName;
          var userName=values.userName;
          var password=values.password;
          var repassword=values.repassword;
         
          var flag_user=true;
          var flag_pass=true;
          var flag_notNull=true;

          if(nickName && userName && password && repassword){
               flag_notNull=true;
          }
          else{
             flag_notNull=false;
             Toast.fail('注册信息不能为空！', 1, null, true);
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
            if(password!=repassword){
               flag_pass=false;
               Toast.fail('密码输入不一致！', 1, null, true);
            }
            else{
                flag_pass=true;
            }
         }
          
        
            
          if(flag_notNull && flag_user && flag_pass){
              axios.post(REQUEST_URL+'/register',{
                nickName:values.nickName,
                userName:values.userName,
                password:values.password,
              })
              .then(function(res){
                  if(res.data.code==1){
                     Toast.success(res.data.msg,2, null, true);
                  }
                  else{
                     Toast.fail(res.data.msg, 2, null, true);
                  }
              })
              .catch(function(err){
                  console.log(err)
              })
          }
        
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='register'>
         
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <p className="logo"><img src="/src/common/img/logo.svg"/></p>
          <FormItem>
              {getFieldDecorator('nickName')(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="给自己起一个霸气的昵称" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userName')(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password')(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('repassword')(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次输入密码" />
              )}
            </FormItem>
            <FormItem> 
              <Button type="primary" htmlType="submit" className="login-form-button">
                立即注册
              </Button>
              或 <a href="" onClick={this.goLogin.bind(this)}>去登录</a>
            </FormItem>
          </Form>
      </div>
    );
  }
}

const RegisterForm = Form.create()(NormalLoginForm);
export default RegisterForm;
