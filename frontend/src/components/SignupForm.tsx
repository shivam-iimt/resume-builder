import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Input, Button, Form, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function SignupForm() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/editor');
  }, [user, navigate]);

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      await signup(values.name, values.email, values.password);
      message.success('Signup successful! Redirecting...');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      message.error(error.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 transition-colors">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2 !text-blue-700 dark:!text-blue-400">
            Create Your Account
          </Title>
          <Text className="text-gray-500 dark:text-gray-400">
            Start building your professional resume and portfolio today.
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="John Doe"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="john@example.com"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg transition-all"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Text className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Login here
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
}
