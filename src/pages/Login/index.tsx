import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCode, login } from '@/store/actions/login'
import { loginForm } from '@/types/data'
import { AxiosError } from 'axios'
import { InputRef } from 'antd-mobile/es/components/input'

export default function Login() {
  const history = useHistory()
  // 返回函数
  const back = () => {
    history.go(-1)
  }
  const dispatch = useDispatch()
  // 点击登陆函数
  const onFinish = async (values: loginForm) => {
    try {
      await dispatch(login(values))
      // 登陆成功提示
      Toast.show({
        content: '登陆成功',
        duration: 300,
        afterClose: () => {
          history.push('/home')
        }
      })
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      console.log(err.response?.data.message)
    }
  }
  // 点击获取验证码
  const [form] = Form.useForm()
  const mobileRef = useRef<InputRef>(null)
  const [timeLeft, settimeLeft] = useState(0)
  const timeoutRef = useRef(-1)
  const onGetCode = () => {
    if (timeLeft !== 0) {
      return
    }
    // 拿到手机号, 对手机号进行验证
    const mobile = form.getFieldValue('mobile')
    const mobileErr = form.getFieldError('mobile').length > 0
    if (!mobile || mobileErr) {
      // 如果验证不通过,自动获取焦点
      mobileRef.current?.focus()
      return
    }

    // 获取验证码的逻辑
    dispatch(getCode(mobile))
    settimeLeft(60)
    timeoutRef.current = window.setInterval(() => {
      settimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }

  useEffect(() => {
    // 卸载清除定时器
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timeoutRef.current)
    }
  }, [timeLeft])
  return (
    <div className={styles.root}>
      {/* navbar */}
      <NavBar onBack={back}></NavBar>
      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">短信登陆</h2>
        <Form
          validateTrigger={['onChange', 'onBlur']}
          form={form}
          onFinish={onFinish}
          initialValues={{ mobile: '13911111111', code: '246810' }}
        >
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
              <Input
                autoComplete="off"
                placeholder="请输入手机号"
                ref={mobileRef}
              ></Input>
            </Form.Item>
          </List.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={onGetCode}>
                {timeLeft === 0
                  ? '点击发送验证码'
                  : `在${timeLeft}后发送验证码`}
              </span>
            }
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
