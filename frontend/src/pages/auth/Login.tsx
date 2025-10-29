import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useLocation } from 'wouter';
import useAuth from '../../hooks/useAuth';
import PublicLayout from '../../layout/PublicLayout';

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Logged in');
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        message.error(axiosErr.response?.data?.message || 'Login failed');
      } else {
        message.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" block>
          Login
        </Button>
        <div className="mt-4 text-center">
          <span className="text-sm">
            Don’t have an account? <a onClick={() => navigate('/register')}>Register</a>
          </span>
        </div>
      </Form>
    </PublicLayout>
  );
}
