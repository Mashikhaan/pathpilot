import React from "react";
import ResumeForm from "../../../components/ResumeForm";
import { useState } from "react";
import initialData from "./initialData";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { FiEye, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PreviewResume from "./PreviewResume";
import { useSelector } from "react-redux";
import { setUser } from "../../auth/state/auth.slice";



// Step config — title + subtitle for each step
const STEPS = [
  {
    step: 1,
    title: "Personal Information",
    subtitle: "Your basic contact details",
  },
  {
    step: 2,
    title: "Professional Summary",
    subtitle: "A quick intro about yourself",
  },
  { step: 3, title: "Skills", subtitle: "Your technical skills" },
  {
    step: 4,
    title: "Work Experience",
    subtitle: "Your past jobs & internships",
  },
  { step: 5, title: "Projects", subtitle: "Projects you have built" },
  { step: 6, title: "Education", subtitle: "Your academic background" },
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
 const { user } = useSelector((state) => state.auth);


  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [data, setData] = useState(initialData);
  const [showPreview, setShowPreview] = useState(false);

  // Total number of steps
  const TOTAL_STEPS = STEPS.length;
  //active step
  const activeStep = STEPS.find((s) => s.step === currentStep);
  //progress percentage
  const progressPct = (currentStep / TOTAL_STEPS) * 100;
  //check if last step
  const isLastStep = currentStep === TOTAL_STEPS;

  //previous button function
  const prevBtn = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  //next button function
  const nexBtn = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  //show resume form function
  const showResumeForm = () => {
    setShowPreview(true);
  };

  //show preview page
  if(showPreview){
    return(
      <PreviewResume data={data} onBack={() => setShowPreview(false)} user={user} setUser = {setUser} />
    )
  }



  //---Show Form--
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky top-0 left-0 w-full bg-white/75 backdrop-blur-md h-14.5  z-50 flex items-center justify-between px-8 py-2 border-b border-black/10"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <span
            onClick={() => navigate("/dashboard")}
            className="font-extrabold text-base tracking-tight text-black"
          >
            PathPilot
          </span>
          <span className="hidden rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-black/50 sm:block">
            Resume Builder
          </span>
        </div>

        <button
          onClick={() => setShowPreview(true)}
          className=" group flex h-8 items-center justify-center gap-2 rounded-lg border border-black/15 text-black/60 transition px-2 hover:border-[#0A0A0A] hover:text-[#0A0A0A] cursor-pointer  "
        >
          <FiEye
            size={13}
            className="transition-transform duration-300 group-hover:scale-101  group-hover:-translate-y-0.2 group-hover:rotate-12"
          />
        </button>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 px-3 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* Step Info */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] text-black/40 font-medium">
                STEP {currentStep} OF {TOTAL_STEPS}
              </p>
              <p className="hidden text-[10px] text-black/40 sm:block">
                {Math.round(progressPct)}% complete
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-black/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Step Title */}
            <div className="mt-3">
              <h1 className="text-xl font-bold sm:text-2xl">
                {activeStep.title}
              </h1>
              <p className="mt-1 text-xs text-black/45 sm:text-sm">
                {activeStep.subtitle}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-4">
            <div className="mt-6 h-px w-full bg-black/10" />
          </div>

          {/*Resume Form  */}
          <ResumeForm step={currentStep} data={data} setData={setData} />

          {/* Divider */}
          <div className="mb-4">
            <div className="mt-6 h-px w-full bg-black/10" />
          </div>

          {/* Navigation Button */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}

            <button
              onClick={prevBtn}
              disabled={currentStep === 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold
    border transition-all  hover:bg-black hover:-translate-y-0.5
         hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)]
    ${
      currentStep === 1
        ? "bg-black/5 border-black/5 text-black/25 cursor-not-allowed  disabled:hover:bg-black/5  disabled:hover:text-black/25" 
        : "bg-[#000000]/90 border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-black hover:border-white/20 cursor-pointer"
    }`}
            >
              <FiArrowLeft size={15} />

              <span className="hidden sm:block">Previous</span>
            </button>

            {/* Step Dots */}
            <div className="flex items-center gap-1.5 ">
              {STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`rounded-full cursor-pointer transition-all ${
                    s.step === currentStep
                      ? "w-4 h-1.5 bg-[#0A0A0A] "
                      : s.step < currentStep
                        ? "w-1.5 h-1.5 bg-black/35"
                        : "w-1.5 h-1.5 bg-black/12"
                  }`}
                />
              ))}
            </div>

            {/* Next or Preview Button */}
            {isLastStep ? (
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#000000]/90 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:border-white/20 transition-all  hover:bg-black hover:-translate-y-0.5
         hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] cursor-pointer"
              >
                <FiEye size={15} />

                <span className="hidden sm:block">Preview Resume</span>
              </button>
            ) : (
              <button
                onClick={nexBtn}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#000000]/90 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:border-white/20 transition-all  hover:bg-black hover:-translate-y-0.5
         hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] cursor-pointer "
              >
                <span className="hidden sm:block">Next</span>

                <FiArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
