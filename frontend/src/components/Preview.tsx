import React from 'react';
import { useResume } from '../hooks/useResume';

export default function Preview() {
  const { resumeData } = useResume();
  const { personal, experience, projects, skills } = resumeData;

  return (
    <div
      id="preview"
      className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-lg text-gray-800 font-sans leading-relaxed"
    >
      {/* Personal Info */}
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-700">{personal.name || 'Your Name'}</h1>
        {personal.headline && <p className="text-lg text-gray-600 mt-1">{personal.headline}</p>}
        <p className="text-sm text-gray-500 mt-2">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span className="mx-2">|</span>}
          {personal.phone && <span>{personal.phone}</span>}
        </p>
      </header>

      {/* Experience Section */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-3">
                <h3 className="font-semibold text-lg">{exp.title || 'Job Title'}</h3>
                <p className="text-sm text-gray-600">
                  {exp.company || 'Company'} {exp.years && `(${exp.years})`}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={i} className="border-l-4 border-green-500 pl-3">
                <h3 className="font-semibold">{proj.title || 'Project Title'}</h3>
                {proj.summary && <p className="text-sm text-gray-700">{proj.summary}</p>}
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {proj.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
