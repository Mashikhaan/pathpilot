import { useCoin } from "../service/auth.api";
import { updateInterviewCoin } from "../state/auth.slice";
import { useDispatch } from "react-redux";



export const useUpdateCoin = () => {
    const dispatch = useDispatch()
    

    const handleUseCoin = async (coins, action) => {
        try {
            const data = await useCoin(coins, action);
            dispatch(updateInterviewCoin(data.interviewCoin));
            return data
        } catch (error) {
            console.log("Error using coin:", error);
            throw error
        }
    }

    return {handleUseCoin}
}