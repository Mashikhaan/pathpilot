import React from "react";


const ATSTemplate = ({ data }) => {


  //get data
  const {
    name,
    email,
    phone,
    location,
    linkedin,
    github,
    summary,
    skills,
    experience,
    projects,
    education,
  } = data;

  //skills list
  const skillsList = skills
    ? skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Split skills into 2 columns
  const halfList = Math.ceil(skillsList.length / 2);
  const skillsCol1 = skillsList.slice(0, halfList);
  const skillsCol2 = skillsList.slice(halfList);

  //Render Description
  const renderDes = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    return (
      <ul className="mt-1 ml-4 list-disc p-0">
        {lines.map((line, i) => (
          <li key={i} className="mb-px text-[11px] leading-[1.6] text-black">
            {line.replace(/^[•-]\s*/, "")}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className="box-border w-[210mm] min-h-[297mm] bg-white px-[18mm] py-[15mm] text-black"
      style={{ fontFamily: " 'Times New Roman',Times,serif " }}
    >
      {/* Header */}
      <div className="mb-2.5 border-b-2 border-black pb-2.5 text-center ">
        <h2 className="m-0 mb-1.75 text-[28px] font-bold uppercase tracking-[0.08em] ">
          {name || "YOUR NAME"}
        </h2>

        {/* email,phone,location,linkdein,github */}
        <div className="flex flex-wrap justify-center text-[10.5px] text-black">
          {[
            email,
            phone,
            location,
            linkedin ? `linkedin.com/in/${linkedin}` : null,
            github ? `github.com/${github}` : null,
          ]
            .filter(Boolean)
            .map((v, i, arr) => (
              <span key={i} className="whitespace-nowrap">
                {v}
                {i < arr.length - 1 && (
                  <span className="mx-1.75 text-black ">|</span>
                )}
              </span>
            ))}
        </div>
      </div>
      {/* ── SUMMARY ── */}
      {summary && (
        <section className="mb-3.25 ">
          <h2 className="mt-0 mb-2.25 border-b-[1.5px] border-black pb-0.75 text-[10.5px] font-bold uppercase tracking-[0.14em] text-black ">
            Professional Summary
          </h2>
          <p className="m-0 text-[11px] leading-[1.65] text-black ">
            {summary}
          </p>
        </section>
      )}

      {/* ──── SKILLS ───  */}
      {skillsList.length > 0 && (
        <section className="mb-3.25 ">
          <h2 className="mt-0 mb-2.25 border-b-[1.5px] pb-0.75 text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 gap-y-0.5 gap-x-5 ">
            {/* column 1 */}
            <ul className="m-0 list-disc pl-4">
              {skillsCol1.map((skill, i) => (
                <li
                  key={i}
                  className="text-[11px] leading-[1.7] text-black capitalize"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* column 2 */}
            <ul className="m-0 list-disc pl-4">
              {skillsCol2.map((skill, i) => (
                <li
                  key={i}
                  className="text-[11px] leading-[1.7] text-black capitalize"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/*Work Experience */}
      {experience.length > 0 && (
        <section className="mb-3.25 ">
          <h2 className="mt-0 mb-2.25 border-b-[1.5px] border-black pb-0.75 text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
            Work Experience
          </h2>

          {experience.map((exp, i) => (
            <div
              key={i}
              className="mb-2.75 break-inside-avoid print:break-inside-avoid"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] font-bold text-black">
                  {exp.role}
                </span>
                <span className="ml-2 whitespace-nowrap text-[10.5px] text-black">
                  {exp.duration}
                </span>
              </div>

              <div className="mb-0.5 text-[11px] italic text-black">
                {exp.company}
              </div>

              {renderDes(exp.description)}
            </div>
          ))}
        </section>
      )}

      {/*Projects*/}
      {projects.length > 0 && (
        <section className="mb-3.25 ">
          <h2 className="mt-0 mb-2.25 border-b-[1.5px] border-black pb-0.75 text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
            Projects
          </h2>

          {projects.map((proj, i) => (
            <div
              key={i}
              className="mb-2.75 break-inside-avoid print:break-inside-avoid"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] font-bold text-black">
                  {proj.name}
                </span>
                {proj.github && (
                  <span className="ml-2 whitespace-nowrap text-[10.5px] text-black">
                    {proj.github}
                  </span>
                )}
              </div>

              {proj.techStack && (
                <div className="mb-0.5 text-[11px] italic text-black">
                  <span className="font-bold">Tech Stack:</span>
                  {proj.techStack}
                </div>
              )}

              {renderDes(proj.description)}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-3.25 ">
          <h2 className="mt-0 mb-2.25 border-b-[1.5px] border-black pb-0.75 text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
            Education
          </h2>

          {education.map((edu, i) => (
            <div
              key={i}
              className="mb-2.75 break-inside-avoid print:break-inside-avoid"
            >
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[12px] text-black">
                  {edu.degree}
                  {edu.branch ? ` in ${edu.branch}` : ""}
                </span>
                <span className="ml-2 whitespace-nowrap text-[10.5px] text-black">
                  {edu.year}
                </span>
              </div>

              <div className="mb-0.5 text-[11px] italic text-black">
                {edu.college}
                {edu.cgpa && (
                  <span className="ml-1.5">
                  | CGPA: <strong>{edu.cgpa}</strong>
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ATSTemplate;
