import React from 'react';
import { Input, Card, Typography, Divider, Form } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useResume } from '../hooks/useResume';
import ExperienceList from './ExperienceList';
import ProjectList from './ProjectList';
import SkillInput from './SkillInput';

const { Title } = Typography;
const { TextArea } = Input;

export default function Editor() {
  const { resumeData, setResumeData } = useResume();

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      {/* Personal Information Section */}
      <Card
        bordered={false}
        className="shadow-md rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <Title level={3} className="!text-blue-700 dark:!text-blue-400 font-semibold">
            Personal Information
          </Title>
          <EditOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
        </div>

        <Form layout="vertical" className="space-y-3">
          <Form.Item label="Full Name" required>
            <Input
              name="name"
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
              value={resumeData.personal.name}
              onChange={handlePersonalChange}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              name="email"
              prefix={<MailOutlined />}
              type="email"
              placeholder="you@example.com"
              value={resumeData.personal.email}
              onChange={handlePersonalChange}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Phone Number" required>
            <Input
              name="phone"
              prefix={<PhoneOutlined />}
              placeholder="+91 9876543210"
              value={resumeData.personal.phone}
              onChange={handlePersonalChange}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Headline / Summary">
            <TextArea
              name="headline"
              rows={4}
              placeholder="A brief summary about your experience or career goals"
              value={resumeData.personal.headline}
              onChange={handlePersonalChange}
              className="rounded-lg resize-none"
            />
          </Form.Item>
        </Form>
      </Card>

      <Divider className="my-8 border-gray-300 dark:border-gray-700" />

      {/* Experience Section */}
      <Card
        bordered={false}
        className="shadow-md rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        <Title level={3} className="!text-blue-700 dark:!text-blue-400 mb-4 font-semibold">
          Work Experience
        </Title>
        <ExperienceList />
      </Card>

      <Divider className="my-8 border-gray-300 dark:border-gray-700" />

      {/* Projects Section */}
      <Card
        bordered={false}
        className="shadow-md rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        <Title level={3} className="!text-blue-700 dark:!text-blue-400 mb-4 font-semibold">
          Projects
        </Title>
        <ProjectList />
      </Card>

      <Divider className="my-8 border-gray-300 dark:border-gray-700" />

      {/* Skills Section */}
      <Card
        bordered={false}
        className="shadow-md rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        <Title level={3} className="!text-blue-700 dark:!text-blue-400 mb-4 font-semibold">
          Skills
        </Title>
        <SkillInput />
      </Card>
    </motion.div>
  );
}
