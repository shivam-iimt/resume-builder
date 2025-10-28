import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicResume } from "../services/resume";
import { ResumeData } from "../shared/types";

export default function PublicRoute() {
  const { slug } = useParams<{ slug: string }>();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getPublicResume(slug)
        .then((res) => setResume(res.data))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!resume) return <div className="p-4">Resume not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{resume.personal.name}</h1>
      <p>{resume.personal.headline}</p>
      <p>
        Email: {resume.personal.email} | Phone: {resume.personal.phone}
      </p>
    </div>
  );
}
