import { useResume } from '../hooks/useResume';

function Preview() {
  const { resumeData } = useResume();
  const { personal, experience, projects, skills } = resumeData;

  return (
    <div
      id="preview"
      className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg p-8 rounded-lg text-gray-800 dark:text-gray-100 font-sans leading-relaxed transition-colors"
    >
      {/* Personal Info */}
      <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          {personal?.name || 'Your Name'}
        </h1>
        {personal?.headline && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{personal.headline}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.email && personal?.phone && <span className="mx-2">|</span>}
          {personal?.phone && <span>{personal.phone}</span>}
        </p>
      </header>

      {/* Experience Section */}
      {experience?.length ? (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-blue-500 dark:border-blue-400 pl-3">
                <h3 className="font-semibold text-lg">{exp.title || 'Job Title'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.company || 'Company'} {exp.years && `(${exp.years})`}
                </p>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Projects Section */}
      {projects?.length ? (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={i} className="border-l-4 border-green-500 dark:border-green-400 pl-3">
                <h3 className="font-semibold">{proj.title || 'Project Title'}</h3>
                {proj.summary && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">{proj.summary}</p>
                )}
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
      ) : null}

      {/* Skills Section */}
      {skills?.length ? (
        <section>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Preview;
