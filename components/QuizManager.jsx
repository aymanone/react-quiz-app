import useQuizStore from "/stores/quizStore.jsx";
import QuizDeterminer from "/components/QuizDeterminer.jsx";
import Quiz from "/components/Quiz.jsx";
function QuizManager(props){
    const { quiz,setQuiz,renderCounter }=useQuizStore();

    
    const updateQuiz=(q)=>{
        setQuiz(q);
    }
    
    return (
        <>
       { quiz?
            <Quiz quiz={quiz} resetQuiz={updateQuiz} key={renderCounter}></Quiz>:
    
    
            <QuizDeterminer setQuiz={updateQuiz} key={renderCounter}></QuizDeterminer>}
        
        </>
    )
}
export default QuizManager;