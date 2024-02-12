import {useRef,useState} from "react";
function QuizDeterminer(props){
  // the quizdeterminer will send a url of the api call 
  // the props will contain the func for that or we will try import
  // both determiner or quiz will be shown according to a state
  // the quiz will have some way to redifene search  
  const categories={
    "general knowledge":9,
    "entertainment: books":10,
    "entertainment: film":11,
    "entertainment: music":12,
    "entertainment: television":14,
    "entertainment: video games":15,
    "science and nature":17,
    "science : computers":18
  }
  console.log(props.c);
  const categoriesKeys=Object.keys(categories);
  let categoriesRef=useRef();
  let questionsNumRef=useRef();
  let difficultyRef=useRef();
  const [questionsNum,useQuestionsNum]=useState(5);
  const [searchState,useSearchState]=useState("");
  
  const updateNum=()=>{useQuestionsNum(questionsNumRef.current.value)};
  const getQuery= async()=>{
    const category=categoriesRef.current.value;
    const difficulity=difficultyRef.current.value;
   
    const data=fetch(`https://opentdb.com/api.php?amount=${questionsNum}&category=${categories[categoriesRef.current.value]}&difficulty=${difficultyRef.current.value}&type=multiple`).then(res=>{
      if (res.ok){
        return  res.json();}
      throw new Error("something wrong now");
    });
    const quiz=await data.then((data)=>data);
    if(quiz.hasOwnProperty("results")){
    props.setQuiz(quiz);
    }
    else{
      useSearchState("sorry something wrong try again");
    }
    
    
    

  };
  
  return (
    <>
    <div>
    <label htmlFor="categories">choose category </label>
    <select name="categories" ref ={categoriesRef} >
    <optgroup label="categories">
    {categoriesKeys.map((cat,i)=><option value={cat} key={i}>{cat}</option>)}
    </optgroup>
    </select>
    </div>
    <div>
    <label>choose the level of difficulty</label>
    <select ref={difficultyRef}>
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
    </div>
    <div>
    <label>choose number of questions between 5 and 20</label>
    <input type="range" name="num" min="5" max="20" value="5" ref={questionsNumRef} onChange={updateNum}>
    </input>
    <h1>number of questions : {questionsNum}</h1>
    </div>

    <button onClick={getQuery}>get quiz</button> <h2>{searchState}</h2>
    </>
  )
}
export default QuizDeterminer;