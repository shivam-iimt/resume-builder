import React from 'react';
import { Button, Typography, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl px-6 text-center"
      >
        <Card
          bordered={false}
          className="shadow-xl rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-8"
        >
          <Title
            level={1}
            className="!text-4xl sm:!text-5xl font-bold !text-blue-700 dark:!text-blue-400 mb-4"
          >
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">Resume Builder</span>
          </Title>

          <Paragraph className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            Create, customize, and share your professional resume and portfolio effortlessly —
            beautifully designed and AI-powered.
          </Paragraph>

          <Link to="/login">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className="!rounded-xl !px-8 !py-5 font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 transition-all duration-300"
            >
              Get Started
            </Button>
          </Link>
        </Card>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm text-center px-4">
        © {new Date().getFullYear()} Resume Builder. Crafted with ❤️ for professionals.
      </footer>
    </div>
  );
};

export default Home;
