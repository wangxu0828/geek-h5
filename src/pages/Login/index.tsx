import React from 'react'
import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const history = useHistory()
  // 返回函数
  const back = () => {
    history.go(-1)
  }
  // 点击登陆函数
  const onFinish = (value: { mobile: string; code: string }) => {
    console.log(value)
  }
  return (
    <div className={styles.root}>
      {/* navbar */}
      <NavBar onBack={back}></NavBar>
      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">短信登陆</h2>
        <Form validateTrigger={['onChange', 'onBlur']} onFinish={onFinish}>
          <List.Item className="login-code-extra">
            <Form.Item
              className="login-item"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '手机号不能为空'
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误'
                }
              ]}
            >
              <Input autoComplete="off" placeholder="请输入手机号"></Input>
            </Form.Item>
          </List.Item>
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空'
                },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码格式错误'
                }
              ]}
            >
              <Input autoComplete="off" placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button
              color="primary"
              block
              className="login-submit"
              type="submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
