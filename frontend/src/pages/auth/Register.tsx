import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useLocation } from 'wouter';
import useAuth from '../../hooks/useAuth';
import PublicLayout from '../../layout/PublicLayout';

export default function Register() {
  const [, navigate] = useLocation();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await register(values.name, values.email, values.password);
      message.success('Registered');
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        message.error(axiosErr.response?.data?.message || 'Registration failed');
      } else {
        message.error('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <h2 className="text-2xl mb-4 text-center font-semibold">Create account</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </PublicLayout>
  );
}
