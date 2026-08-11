import React from 'react'
import ResumeForm from '../../../components/ResumeForm'
import { useState } from 'react';
import initialData from './initialData';

const ResumeBuilder = () => {
    const[currentStep, setCurrentStep] = useState(6);
    const[data, setData] = useState(initialData);
  return (
   <div className='min-h-screen max-w-2xl w-full mx-auto mt-5'>
     <ResumeForm step={currentStep} data={data} setData={setData}/>
   </div>
  )
}

export default ResumeBuilder