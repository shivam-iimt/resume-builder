import { useEffect } from "react";
import { ResumeData } from "../shared/types";

export const useAutosave = (resume: ResumeData) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("resumeData", JSON.stringify(resume));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resume]);
};
