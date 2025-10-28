import React from 'react';
import { useResume } from '../hooks/useResume';
import { Project } from '../shared/types';

export default function ProjectList() {
  const { resumeData, setResumeData } = useResume();

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: '', summary: '', url: '' }],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    setResumeData({ ...resumeData, projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: updated });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-700 border-b border-gray-200 pb-2">
        Projects
      </h2>

      {resumeData.projects.map((proj, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(i, 'title', e.target.value)}
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 w-full text-sm"
            />

            <textarea
              placeholder="Summary"
              value={proj.summary}
              onChange={(e) => updateProject(i, 'summary', e.target.value)}
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 w-full text-sm resize-none"
              rows={3}
            />

            <input
              type="url"
              placeholder="Project URL"
              value={proj.url}
              onChange={(e) => updateProject(i, 'url', e.target.value)}
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-2 w-full text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeProject(i)}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition"
            >
              Delete Project
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md shadow-sm transition"
      >
        + Add New Project
      </button>
    </div>
  );
}
