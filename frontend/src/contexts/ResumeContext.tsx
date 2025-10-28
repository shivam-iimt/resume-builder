import { useState, ReactNode } from 'react';
import { ResumeData } from '../shared/types';
import { ResumeContext } from '../hooks/useResume';

const defaultResume: ResumeData = {
  personal: { name: '', email: '', phone: '', headline: '' },
  experience: [],
  projects: [],
  skills: [],
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResume);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
