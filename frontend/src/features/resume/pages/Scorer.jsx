import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";
import { useNavigate } from "react-router";


const Scorer = () => {
   
const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    if (!file || isAnalyzing) return;

    setIsAnalyzing(true);

    // use redux
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
    <motion.nav
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black px-8 py-3"
>
  {/* Left-side logo */}
  <div
    onClick={() => navigate("/dashboard")}
    className="flex cursor-pointer items-center gap-2"
  >
    {/* Original Logo */}
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A0A0A] shadow-[0_0_0_2px_#FFFFFF]">
      <GiArtificialHive
        size={15}
        color="white"
      />
    </div>

    {/* PathPilot */}
    <span className="text-base font-extrabold tracking-tight text-white">
      PathPilot
    </span>
  </div>
</motion.nav>
      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Stage */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                1
              </span>

              <span className="text-sm font-medium text-white">
                Upload Resume
              </span>
            </div>

            <div className="h-px w-10 bg-zinc-700" />

            <div className="flex items-center gap-2 opacity-40">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-xs font-medium text-zinc-200">
                2
              </span>

              <span className="text-sm text-zinc-100">Results</span>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {/* Progress */}
            <div className="mb-7 flex justify-center">
              <div className="relative h-24 w-24">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full border-[7px] border-zinc-800" />

                {/* Progress */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: file
                      ? "conic-gradient(white 0deg 180deg, transparent 180deg 360deg)"
                      : "conic-gradient(transparent 0deg 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 0)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 0)",
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {file ? "50%" : "0%"}
                  </span>

                  <span className="text-[10px] text-zinc-500">
                    Stage 1
                  </span>
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

            {/* Upload Area */}
            <label
              htmlFor="resume-upload"
              className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-6 transition-all ${
                file
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
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-sm font-medium text-zinc-300">
                      Click to upload your resume
                    </p>

                    <p className="mt-1 text-center text-xs text-zinc-600">
                      PDF
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </label>

            {/* Analyze Button */}
            <motion.button
              whileHover={
                file && !isAnalyzing ? { scale: 1.01 } : {}
              }
              whileTap={
                file && !isAnalyzing ? { scale: 0.98 } : {}
              }
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
                file && !isAnalyzing
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
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

            {/* Status */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-xs text-zinc-500"
                >
                  We’re analyzing your resume. This may take a moment...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Scorer;