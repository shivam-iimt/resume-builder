import React, { useState } from 'react';
import { useResume } from '../hooks/useResume';
import { Input, Button, Tag, Typography, Empty } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function SkillInput() {
  const { resumeData, setResumeData } = useResume();
  const [input, setInput] = useState('');

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (resumeData.skills.includes(trimmed)) return; // prevent duplicates
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, trimmed],
    });
    setInput('');
  };

  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="!m-0 text-blue-700 dark:!text-blue-400 font-semibold">
          Skills
        </Title>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
        {resumeData.skills.length > 0 ? (
          resumeData.skills.map((skill) => (
            <Tag
              key={skill}
              closable
              onClose={() => removeSkill(skill)}
              closeIcon={<CloseOutlined />}
              className="!px-3 !py-1.5 !text-sm !rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:!bg-blue-100 dark:hover:!bg-blue-800 transition-all"
            >
              {skill}
            </Tag>
          ))
        ) : (
          <Empty
            description="No skills added yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="mx-auto text-gray-400 dark:text-gray-500"
          />
        )}
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <Input
          placeholder="Type a skill and press Add"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="large"
          className="!rounded-lg"
          onPressEnter={addSkill}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addSkill}
          size="large"
          className="!rounded-lg !bg-green-600 hover:!bg-green-700 transition-all"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
