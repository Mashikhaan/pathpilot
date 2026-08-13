import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import { useResume } from "../hooks/useResume";
import { GiArtificialHive } from "react-icons/gi";
import { useNavigate } from "react-router";

const Scorer = () => {
  const navigate = useNavigate();
  
  const { handleUploadResume, handleGetResume } = useResume();

  const resume = useSelector((state) => state.resume.resume);

  //when page reload then get resume from backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await handleGetResume();

        if (data) {
          setShowResults(true);
        }
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };

    fetchResume();
  }, []);

  const [progress, setProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState("");
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // for showing result screen
  const [showResults, setShowResults] = useState(false);

  // File select hone par progress 50% ho jayega
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    //Manually select file and upload
    if(!selectedFile) return
   
        // only pdf files allow
  if (selectedFile.type !== "application/pdf") {
    setAnalysisStatus("Please upload a PDF file.");
    return;
  }

    if (selectedFile) {
      setFile(selectedFile);
      setProgress(50);
      setAnalysisStatus("");
      setShowResults(false);
    }
  };

  // Drag and Drop file upload
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isAnalyzing) {
    setIsDragging(true);
  }
};

// Drag leave
const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setIsDragging(false);
};

// After File Drop then save in State
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setIsDragging(false);

  if (isAnalyzing) return;

  const droppedFile = e.dataTransfer.files?.[0];

  if (!droppedFile) return;

  // only pdf files allow
  if (droppedFile.type !== "application/pdf") {
    setAnalysisStatus("Please upload a PDF file.");
    return;
  }

  setFile(droppedFile);
  setProgress(50);
  setAnalysisStatus("");
  setShowResults(false);
};

  // Analyze button click hone par resume analyze hoga
  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;

    try {
      setIsAnalyzing(true);
      setShowResults(false);

      setProgress(55);
      setAnalysisStatus("Reading your resume...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setProgress(70);
      setAnalysisStatus("Analyzing your skills...");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProgress(85);
      setAnalysisStatus("Matching your experience...");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Backend ko resume bhej rahe hain
      const result = await handleUploadResume(file);

      console.log("FULL RESULT:", result);

      if (!result?.success) {
        throw new Error(result?.message || "Resume analysis failed");
      }

      setProgress(95);
      setAnalysisStatus("Generating your resume score...");

      await new Promise((resolve) => setTimeout(resolve, 800));

      setProgress(100);
      setAnalysisStatus("Analysis complete!");

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Analysis complete hone ke baad result screen show hogi
      setShowResults(true);
    } catch (error) {
      console.error("Resume upload error:", error);

      setAnalysisStatus(
        error?.message || "Something went wrong. Please try again.",
      );

      setProgress(50);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-upload button click karne par wapas upload screen par jayenge
  const handleReupload = () => {
    setShowResults(false);
    setFile(null);
    setProgress(0);
    setAnalysisStatus("");
    setIsAnalyzing(false);
  };

  const score = resume?.score ?? 0;

  // Score ke according circle aur label ka color change hoga
  const getScoreColor = (score) => {
    if (score >= 80) {
      return {
        main: "#22c55e",
        light: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-300",
        label: "Excellent",
      };
    }

    if (score >= 60) {
      return {
        main: "#eab308",
        light: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-300",
        label: "Good",
      };
    }

    return {
      main: "#ef4444",
      light: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-300",
      label: "Needs Improvement",
    };
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 px-8 py-3"
      >
        <div onClick={() => navigate("/dashboard")}
         className="flex h-14.5 w-full items-center justify-between px-8 cursor-pointer">
       

          <div className="flex items-center gap-2 bg-white p-2">
          

            <span className="text-base font-extrabold tracking-tight text-black">
              PathPilot
            </span>
             <span className="hidden rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-black/50 sm:block">
              Resume Scorer
            </span>
          </div>

          {/* Steps */}

          <div className="flex items-center gap-3">
            {/* Upload step */}

            <div
              className={`flex items-center gap-2 transition-opacity ${
                showResults ? "opacity-40" : "opacity-100"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium ${
                  showResults
                    ? "border-zinc-600 text-zinc-500"
                    : "border-white bg-white text-black"
                }`}
              >
                1
              </span>

              <span
                className={`text-sm font-medium ${
                  showResults ? "text-zinc-500" : "text-white"
                }`}
              >
                Upload Resume
              </span>
            </div>

            {/* Connecting line */}

            <div className="h-px w-10 bg-zinc-700" />

            {/* Result step */}

            <div
              className={`flex items-center gap-2 transition-opacity ${
                showResults ? "opacity-100" : "opacity-40"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium ${
                  showResults
                    ? "border-white bg-white text-black"
                    : "border-zinc-600 text-zinc-500"
                }`}
              >
                2
              </span>

              <span
                className={`text-sm font-medium ${
                  showResults ? "text-white" : "text-zinc-500"
                }`}
              >
                Results
              </span>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="flex min-h-screen items-center justify-center px-4 pb-12 pt-24">
        <AnimatePresence mode="wait">
          {!showResults ? (
            // Upload screen

            <motion.div
              key="upload-screen"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
              }}
              className="w-full max-w-md"
            >
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
                {/* Progress circle */}

                <div className="mb-7 flex justify-center">
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full border-[7px] border-zinc-800" />

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          white 0deg ${progress * 3.6}deg,
                          transparent ${progress * 3.6}deg 360deg
                        )`,
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 0)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 0)",
                      }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {progress}%
                      </span>

                      <span className="text-[10px] text-zinc-500">Stage 1</span>
                    </div>
                  </div>
                </div>

                {/* Heading */}

                <div className="text-center">
                  <h1 className="text-xl font-semibold tracking-tight text-white">
                    Analyze your resume
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Upload your resume and let us analyze it for you.
                  </p>
                </div>

                {/* Resume upload */}

                <label
                  htmlFor="resume-upload"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 transition-all ${
                    isDragging
                      ? "border-white bg-white/10"
                      : file
                        ? "border-white/30 bg-white/5 hover:bg-white/10"
                        : "border-zinc-700 bg-zinc-900/40 hover:border-zinc-500 hover:bg-zinc-900/70"
                  }`}
                >
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isAnalyzing}
                  />

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 16V4" />
                      <path d="m7 9 5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {file ? (
                      <motion.div
                        key="file"
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        className="max-w-full text-center"
                      >
                        <p className="truncate text-sm font-medium text-white">
                          {file.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        {isDragging ? (
                          <>
                            <p className="text-sm font-medium text-white">
                              Drop your resume here
                            </p>

                            <p className="mt-1 text-center text-xs text-zinc-500">
                              Release to upload
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-zinc-300">
                              Click to upload your resume
                            </p>

                            <p className="mt-1 text-center text-xs text-zinc-600">
                              or drag and drop your PDF here
                            </p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </label>

                {/* Analyze button */}

                <motion.button
                  whileHover={file && !isAnalyzing ? { scale: 1.01 } : {}}
                  whileTap={file && !isAnalyzing ? { scale: 0.98 } : {}}
                  onClick={handleAnalyze}
                  disabled={!file || isAnalyzing}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 cursor-pointer text-sm font-semibold transition-all ${
                    file && !isAnalyzing
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.span
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-zinc-500 border-t-white"
                      />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Resume"
                  )}
                </motion.button>

                {/* Analysis status */}

                <AnimatePresence mode="wait">
                  {(isAnalyzing || analysisStatus) && (
                    <motion.p
                      key={analysisStatus}
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                      }}
                      className="mt-4 text-center text-xs text-zinc-500"
                    >
                      {analysisStatus}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // Results screen

            <motion.div
              key="results-screen"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="w-full max-w-5xl"
            >
              {/* Result header */}

              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Resume Analysis
                  </p>

                  <h1 className="mt-2 text-2xl font-bold text-white">
                    {resume?.name || "Your Resume"}
                  </h1>

                  <p className="mt-2 text-sm text-zinc-500">
                    {resume?.summary ||
                      "Your resume has been successfully analyzed."}
                  </p>
                </div>

                {/* Re-upload button */}

                <button
                  type="button"
                  onClick={handleReupload}
                  className="shrink-0 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white cursor-pointer"
                >
                  Re-upload Resume
                </button>
              </div>

              {/* Score card */}

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-center gap-6">
                  {/* Score circle */}

                  <div className="relative h-28 w-28 shrink-0">
                    <div className="absolute inset-0 rounded-full border-8 border-zinc-800" />

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          ${scoreColor.main} 0deg ${score * 3.6}deg,
                          #27272a ${score * 3.6}deg 360deg
                        )`,
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {score}

                        <span className="text-xs text-zinc-500">/100</span>
                      </span>
                    </div>
                  </div>

                  {/* Score information */}

                  <div>
                    <p className="text-sm text-zinc-500">Resume Score</p>

                    <h2
                      className={`mt-1 text-xl font-semibold ${scoreColor.light}`}
                    >
                      {scoreColor.label}
                    </h2>

                    <p className="mt-1 text-sm text-purple-400">
                      {resume?.suggestedRole?.[0] || "Software Developer"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  <span className="mr-2 text-blue-400">●</span>
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {resume?.skills?.length > 0 ? (
                    resume.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No skills found.</p>
                  )}
                </div>
              </div>

              {/* Strengths and weaknesses */}

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-white">
                    <span className="mr-2 text-green-400">●</span>
                    Strengths
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {resume?.Strength?.length > 0 ? (
                      resume.Strength.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-300"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-500">
                        No specific strengths found.
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-white">
                    <span className="mr-2 text-yellow-400">●</span>
                    Weaknesses
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {resume?.weakness?.length > 0 ? (
                      resume.weakness.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs text-yellow-300"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-zinc-500">
                        No specific weaknesses found.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Missing skills */}

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  <span className="mr-2 text-red-400">⚡</span>
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {resume?.missingSkills?.length > 0 ? (
                    resume.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No missing skills detected.
                    </p>
                  )}
                </div>
              </div>

              {/* Recommendations */}

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  <span className="mr-2 text-purple-400">⌁</span>
                  Recommendations
                </h3>

                <div className="space-y-2">
                  {resume?.recommendations?.length > 0 ? (
                    resume.recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-300"
                      >
                        {recommendation}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No recommendations available.
                    </p>
                  )}
                </div>
              </div>

              {/* Education */}

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Education
                </h3>

                <div className="space-y-2">
                  {resume?.education?.length > 0 ? (
                    resume.education.map((education, index) => (
                      <p
                        key={index}
                        className="text-sm leading-6 text-zinc-400"
                      >
                        {education}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No education details found.
                    </p>
                  )}
                </div>
              </div>

              {/* Projects */}

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Projects
                </h3>

                <div className="flex flex-wrap gap-2">
                  {resume?.projects?.length > 0 ? (
                    resume.projects.map((project) => (
                      <span
                        key={project}
                        className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {project}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No projects found.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Scorer;
