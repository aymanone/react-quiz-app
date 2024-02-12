import {  create } from "zustand";
import shallow from "zustand/shallow";
const useQuizStore=create((set,get)=>({
    renderCounter:0,
    quiz:undefined,
    setQuiz:(q)=>set((state)=>({quiz:q,renderCounter:state.renderCounter+1}))
    


}),shallow);
export default useQuizStore;