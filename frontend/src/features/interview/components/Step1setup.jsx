import React, { useEffect, useState } from "react";
import { motion,AnimatePresence } from "motion/react";
import { useUpdateCoin} from "../../auth/hooks/useCoin"
import { useResume } from "../../resume/hooks/useResume";
import { useInterview } from "../hooks/useInterview";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiFileText,
  FiUploadCloud,
} from "react-icons/fi";

import {  useSelector } from "react-redux";
import { useNavigate } from "react-router";


  



function Step1SetUp() {
const user = useSelector((state) => state.auth.user);

   const{handleStartInterview} = useInterview()

  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

 
 // File select hone par progress 50% ho jayega
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    //Manually select file and upload
    if(!selectedFile) return
   
        // only pdf files allow
  if (selectedFile.type !== "application/pdf") {
    alert("Please upload a PDF file.");
    return;
  }

    if (selectedFile) {
      setFile(selectedFile);
      
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
    alert("Please upload a PDF file.");
    return;
  }

  setFile(droppedFile);
 
};

  

  const { handleUploadResume, handleGetResume } = useResume();
  const{handleUseCoin} = useUpdateCoin()
  
  const resume = useSelector((state) => state.resume.resume);
  console.log(resume)

  const [role, setRole]         = useState("");
  const [type, setType]         = useState("technical");
  const [shouldUseResume, setShouldUseResume] = useState(!!resume); // Set to true if resume is available
  const [file, setFile]         = useState(null);
  const [uploading, setUploading] = useState(false);
  const [starting, setStarting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      setShouldUseResume(!!resume);
    if (resume?.role) setRole(resume.role);
  }, [resume]);
    //when page reload then get resume from backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await handleGetResume();
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };

    fetchResume();
  }, []);

const uploadResume = async () => {
  if (!file || uploading) return;

  try {
    setUploading(true);

    const result = await handleUploadResume(file);

    console.log("Resume uploaded successfully:", result);
  } catch (error) {
    console.error("Resume upload failed:", error);
  } finally {
    setUploading(false);
  }
};


//start interview
  const startInterview = async () => {
  try {
    setStarting(true);

    console.log("USER:", user);
    console.log("USER ID:", user.userId);

    const response = await handleStartInterview({
      userId: user?.userId,
      role,
      type,
      useResume: shouldUseResume,
      resume,
    });

    console.log("INTERVIEW RESPONSE:", response);
    navigate(`/interview/${response.interviewId}`);


  } catch (error) {
    console.error("Start interview error:", error);
  } finally {
    setStarting(false);
  }


    
    
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-5">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-4xl bg-[#0E1016] border border-white/10 rounded-2xl sm:rounded-[24px] overflow-hidden grid lg:grid-cols-[40%_60%] shadow-[0_0_60px_rgba(255,255,255,.03)]"
      >

        {/* ── LEFT ── */}
        <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-start gap-4">

          <div>
            <div
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 cursor-pointer"
            >
              <FiArrowLeft size={12} />
              <span className="text-xs text-zinc-300">Back</span>
            </div>

            <h1 className="mt-4 text-xl sm:text-2xl font-bold text-white leading-snug">
              Welcome back,<br />
              {user?.name || "Developer"}
            </h1>

            <p className="mt-2 text-xs sm:text-sm leading-6 text-zinc-400">
              Practice realistic AI interviews, receive instant feedback,
              and improve before your next job interview.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {[
              "Personalized AI Questions",
              "Resume Based Interview",
              "Detailed Performance Report",
              "Real Interview Experience",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 p-3"
              >
                <div className="w-7 h-7 shrink-0 rounded-lg bg-white flex items-center justify-center">
                  <FiCheck className="text-black" size={13} />
                </div>
                <span className="text-xs sm:text-sm text-zinc-300">{item}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="p-5 sm:p-7 flex flex-col">

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">Start Interview</h2>
            <p className="mt-1 text-xs text-zinc-500">Configure your interview preferences.</p>
          </div>

          <div className="mt-5 flex-1 space-y-4 overflow-y-auto">

            {/* Role */}
            <div>
              <label className="text-xs font-medium text-zinc-400">Target Role</label>
              <div className="mt-1.5 relative">
                <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Backend Developer"
                  className="w-full h-11 rounded-xl bg-[#17181E] border border-white/10 pl-10 pr-4 text-sm text-white outline-none focus:border-white/30 transition"
                />
              </div>
            </div>

            {/* Interview Type */}
            <div>
              <label className="text-xs font-medium text-zinc-400">Interview Type</label>
              <div className="mt-1.5 flex rounded-xl bg-[#17181E] p-1 border border-white/10">
                {["technical", "hr"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setType(item)}
                    className={`flex-1 h-9 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all ${
                      type === item ? "bg-white text-black" : "text-zinc-400 hover:text-white cursor-pointer"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Toggle */}
            <div className="rounded-xl border border-white/10 bg-[#17181E] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-white">Use Resume</h3>
                  <p className="mt-0.5 text-xs text-zinc-500">AI will personalize questions using your resume.</p>
                </div>
                <button
                onClick={() => setShouldUseResume(!shouldUseResume)}
                  className={`relative shrink-0 w-12 h-7 rounded-full transition cursor-pointer ${shouldUseResume ? "bg-white" : "bg-zinc-700"}`}
                >
                  <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-black transition-all ${shouldUseResume ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            {/* Resume Ready */}
            {resume && shouldUseResume && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-green-500/20 bg-green-500/5 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-green-500 flex items-center justify-center">
                    <FiFileText className="text-white" size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white">Resume Ready <span className="text-gray-400">( {resume?.suggestedRole} )</span></h4>
                    <p className="text-xs text-zinc-400">Resume detected successfully.</p>
                  </div>
                  <FiCheckCircle className="text-green-400 shrink-0" size={18} />
                </div>
              </motion.div>
            )}

            {/* Upload Resume */}
            {shouldUseResume && (
  <div className="mt-4">
    {/* Upload Area */}
    <label
      htmlFor="resume-upload"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
        isDragging
          ? "border-white bg-white/10"
          : file
            ? "border-white/30 bg-white/5 hover:bg-white/10"
            : "border-white/10 bg-[#17181E] hover:border-white/20"
      }`}
    >
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {/* Upload Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black"
      >
        <FiUploadCloud size={20} />
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
            className="text-center"
          >
            {isDragging ? (
              <>
                <p className="text-sm font-medium text-white">
                  Drop your resume here
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Release to upload
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-zinc-300">
                  Click to upload your resume
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  or drag and drop your PDF here
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </label>

    {/* Upload Button */}
    <motion.button
      type="button"
      whileHover={file && !uploading ? { scale: 1.01 } : {}}
      whileTap={file && !uploading ? { scale: 0.98 } : {}}
      onClick={uploadResume}
      disabled={!file || uploading}
      className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${
        file && !uploading
          ? "cursor-pointer bg-white text-black hover:bg-zinc-200"
          : "cursor-not-allowed bg-zinc-800 text-zinc-500"
      }`}
    >
      {uploading ? (
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
          Uploading...
        </>
      ) : (
        <>
          <FiUploadCloud size={15} />
          Upload Resume
        </>
      )}
    </motion.button>
  </div>
)}

          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={!role || starting || (shouldUseResume && !resume)}
            onClick={startInterview}
            className="mt-5 h-12 rounded-xl bg-white text-black text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition"
          >
            {starting ? "Starting Interview..." : (
              <>Start Interview <FiArrowRight size={15} /></>
            )}
          </motion.button>

        </div>

      </motion.div>
    </div>
  );
}

export default Step1SetUp;