import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { Resume } from "../models/resume";

export const exportResumePDF = async (req: Request, res: Response) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Access the resume data correctly
    const resumeData = resume.data;

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            h2 { font-size: 20px; margin-top: 20px; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>${resumeData.personal?.name || "No Name"}</h1>
          <p>${resumeData.personal?.headline || ""}</p>
          <p>Email: ${resumeData.personal?.email || ""}</p>

          <h2>Experience</h2>
          ${(resumeData.experience || [])
            .map(
              (exp: any) =>
                `<p><strong>${exp.title}</strong> at ${exp.company} (${exp.startDate} - ${exp.endDate})</p>`
            )
            .join("")}

          <h2>Projects</h2>
          ${(resumeData.projects || [])
            .map(
              (proj: any) =>
                `<p><strong>${proj.name}</strong>: ${proj.description}</p>`
            )
            .join("")}

          <h2>Skills</h2>
          <p>${(resumeData.skills || []).join(", ")}</p>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed", error: err });
  }
};
