import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';

interface TemplateSelectorProps {
  selected: string;
  onSelect: (template: string) => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    { id: 'template1', name: 'Classic', color: 'from-blue-500 to-indigo-500' },
    { id: 'template2', name: 'Modern', color: 'from-emerald-500 to-teal-500' },
    { id: 'template3', name: 'Elegant', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Choose Your Resume Template
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => {
          const isSelected = selected === t.id;

          return (
            <Tooltip title={`Select ${t.name} Template`} key={t.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shadow-sm
                  ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-blue-400'
                  }`}
                onClick={() => onSelect(t.id)}
              >
                {/* Template Preview Box */}
                <div
                  className={`h-48 bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-semibold text-xl`}
                >
                  {t.name}
                </div>

                {/* Footer */}
                <div className="bg-white dark:bg-neutral-900 px-4 py-3 text-center border-t dark:border-neutral-700">
                  <span
                    className={`font-medium ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t.name} Template
                  </span>
                </div>

                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-md"
                  >
                    <CheckCircleFilled />
                  </motion.div>
                )}
              </motion.div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
