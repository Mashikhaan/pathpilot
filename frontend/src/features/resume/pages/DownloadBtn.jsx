import React from 'react'
import {FiDownload} from 'react-icons/fi'
import { useReactToPrint } from "react-to-print";
import { useUpdateCoin } from "../../auth/hooks/useCoin";

const DownloadBtn = ({docsRef, user, setUser}) => {
const{handleUseCoin} = useUpdateCoin()

 //handle pdf
 const handlePdf = useReactToPrint({
    contentRef: docsRef,
    documentTitle: "PathPilotPDF",
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 0;
        padding: 0;
      }
      @media print {
        * {
          page-break-inside: avoid;
        }
      }
    `

 })

//handle download
const handleDownload = async()=>{

    await handlePdf();
    await handleUseCoin(20, "resume-download");
    
}


  return (
    <button onClick={handleDownload}
     className='flex items-center justify-center gap-1.5 rounded-lg bg-black text-white  px-3 py-2 sm:px-3 text-xs cursor-pointer '>
        <FiDownload/>
        Download PDF
    </button>
  )
}

export default DownloadBtn