import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { ResumeContext } from '../hooks/useResume';

const initialResume: ResumeData = {
  personal: { name: '', headline: '', email: '', phone: '' },
  experience: [],
  projects: [],
  skills: [],
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  return <ResumeContext.Provider value={{ resumeData, setResumeData }}>{children}</ResumeContext.Provider>;
};
