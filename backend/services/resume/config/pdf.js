import fs from 'fs';
import  {PDFParse } from "pdf-parse";

//extracted text function
const extractText = async(filePath) =>{
  
    //read file 
    const buffer = fs.readFileSync(filePath);

    //parse file
    const pdf = new PDFParse({
        data:buffer
    })

    //extract text
    const result = await pdf.getText();

    return result.text;
}

export default extractText;