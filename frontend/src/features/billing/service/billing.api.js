import axios from "axios";

//create axios instance
const BillingApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})


//create function
export const createOrder = async (planId) => {
    try {
        const response = await BillingApiInstance.post("/api/billing/create-order",{planId});

        return response.data;
    }catch(error){
        throw error;
    }
};

//verify payment function
export const verifyPayment = async (paymentDetails) => {
    const response = await BillingApiInstance.post("/api/billing/verify-payment", paymentDetails);

    return response.data
};



export default BillingApiInstance