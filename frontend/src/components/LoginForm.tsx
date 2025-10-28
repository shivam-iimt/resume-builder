import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/editor');
  }, [user]);

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="shadow-2xl rounded-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
          bordered={false}
        >
          <div className="text-center mb-6">
            <Title level={2} className="!text-blue-700 dark:!text-blue-400 font-bold">
              Welcome Back
            </Title>
            <Text className="text-gray-500 dark:text-gray-300">
              Sign in to continue to your account
            </Text>
          </div>

          {error && <Alert message={error} type="error" showIcon className="mb-4 rounded-md" />}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                prefix={<LockOutlined />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              size="large"
              className="w-full mt-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Log In
            </Button>

            <div className="text-center mt-4">
              <Text className="text-gray-500 dark:text-gray-400">
                Don’t have an account?{' '}
                <a
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Sign up
                </a>
              </Text>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
