import React from 'react';
import { useResume } from '../hooks/useResume';
import { Experience } from '../shared/types';
import { Card, Input, Button, Space, Typography, Tooltip, Divider, Empty } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { TextArea } = Input;
const { Title } = Typography;

export default function ExperienceList() {
  const { resumeData, setResumeData } = useResume();

  const addExperience = () => {
    const newExp: Experience = {
      title: '',
      company: '',
      years: '',
      description: '',
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData({ ...resumeData, experience: updated });
  };

  const removeExperience = (index: number) => {
    const updated = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: updated });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...resumeData.experience];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setResumeData({ ...resumeData, experience: updated });
  };

  const moveDown = (index: number) => {
    if (index === resumeData.experience.length - 1) return;
    const updated = [...resumeData.experience];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setResumeData({ ...resumeData, experience: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={4} className="!text-blue-700 dark:!text-blue-400 font-semibold">
          Work Experience
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addExperience}
          className="rounded-lg"
        >
          Add
        </Button>
      </div>

      <Divider className="my-3 border-gray-300 dark:border-gray-700" />

      <AnimatePresence>
        {resumeData.experience.length === 0 ? (
          <Empty
            description="No experience added yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="my-6"
          />
        ) : (
          resumeData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Card
                className="shadow-sm hover:shadow-md transition-all rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {exp.title || 'Untitled Experience'}
                    </span>
                    <Space>
                      <Tooltip title="Move Up">
                        <Button
                          icon={<ArrowUpOutlined />}
                          onClick={() => moveUp(i)}
                          disabled={i === 0}
                          size="small"
                        />
                      </Tooltip>
                      <Tooltip title="Move Down">
                        <Button
                          icon={<ArrowDownOutlined />}
                          onClick={() => moveDown(i)}
                          disabled={i === resumeData.experience.length - 1}
                          size="small"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeExperience(i)}
                          size="small"
                        />
                      </Tooltip>
                    </Space>
                  </div>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    prefix={<EditOutlined />}
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => updateExperience(i, 'title', e.target.value)}
                    size="large"
                    className="rounded-lg"
                  />
                  <Input
                    prefix={<ApartmentOutlined />}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(i, 'company', e.target.value)}
                    size="large"
                    className="rounded-lg"
                  />
                </div>

                <div className="mt-4">
                  <Input
                    prefix={<CalendarOutlined />}
                    placeholder="Years (e.g. 2020 - 2023)"
                    value={exp.years}
                    onChange={(e) => updateExperience(i, 'years', e.target.value)}
                    size="large"
                    className="rounded-lg"
                  />
                </div>

                <div className="mt-4">
                  <TextArea
                    placeholder="Describe your key responsibilities, achievements, and tools used."
                    value={exp.description}
                    onChange={(e) => updateExperience(i, 'description', e.target.value)}
                    rows={4}
                    className="rounded-lg resize-none"
                  />
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}