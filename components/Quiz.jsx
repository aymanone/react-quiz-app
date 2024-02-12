import {useState,useEffect} from "react";
function Quiz(quiz,resetQuiz){
    // a quiz has results list with question , correct answer and a list of incorrect answers
    // in each of them ,we will make a list of them then shuffle them 
    // and put them in an option list
    const [state,handleState]=useState({msg:"chooose the right answer",
    currentIndex:0,
    score:0,
    nextQuestion:false,
    submit:true

}); 
const currentQuestion=[quiz.quiz.results[state.currentIndex]][0];

let answers=[currentQuestion.correct_answer,
...currentQuestion.incorrect_answers];

const shuffleArray=(array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
useEffect(()=>{
    shuffleArray(answers);

},[state.currentIndex]);





  

const handleReset=()=>{
        quiz.resetQuiz(undefined);
}
const handleNext=()=>{
    handleState({...state,msg:"chooose the right answer",
    shuffle:true,
    submit:true,
    nextQuestion:false,
    currentIndex:state.currentIndex+1
})
}
const handleSubmit=()=>{
    const answer=document.querySelector('input[name="quiz"]:checked').value;
    if(!answer){return undefined;}
    if(answer == currentQuestion.correct_answer){
        const msg="it's the right answer:";
        handleState({...state,msg:msg,score:state.score+1,submit:false,
            nextQuestion:(state.currentIndex+1)<quiz.quiz.results.length
            
        });
      
    }
    else{
    const msg=` wrong the right answer is: ${currentQuestion.correct_answer}`;
    handleState({...state,submit:false,
        msg:msg,
    
    nextQuestion:(state.currentIndex+1)<quiz.quiz.results.length
    });
}
}
    return(
        <>
        <div>
        <h1>quiz</h1>
        <h1>quistion number {state.currentIndex+1}</h1>
        <h2>score is { state.score} out of {quiz.quiz.results.length}</h2>
        <div><label>{state.msg}</label></div>
        <label>{currentQuestion.question}</label>
        {answers.map((item,i)=><div>{item}<input type="radio" name="quiz" value={item} key={i}/>
        </div>)}
        
        </div>
        <div>
            <button onClick={handleSubmit} disabled={!state.submit}>
            submit 
            </button>
            <button onClick={handleNext} disabled={!state.nextQuestion}>
                next question
            </button>
            <button onClick={handleReset}>choose another quiz</button>
        </div>
        

        </>
    )
}
export default Quiz;