import React from "react"
import Intro from "./components/Intro"
import Question from "./components/Question"
import { nanoid } from "nanoid"

export default function App() {

  const [question, setQuestion] = React.useState([])
  const [correctAns, setCorrectAns] = React.useState(0)
  const [showAnswer, setShowAnswer] = React.useState(false)

  // Shuffle array for combined correct and incorrect answer 
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  // Button for starting quiz
  function startQuiz() {
    const new_array = []

    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        data.results.map(x => {
          new_array.push({
            id: nanoid(),
            question: x.question,
            correct_answer: x.correct_answer,
            incorrect_answers: x.incorrect_answers,
            combined_answers: shuffle([x.correct_answer, ...x.incorrect_answers]),
            isClicked: false,
            clickedIndex: null,
            correctIndex: function () {
              return this.combined_answers.indexOf(this.correct_answer)
            }
          })
        })
        setQuestion(new_array)
      })
  }

  // Let user choose answer
  function setClicked(questionId, index) {
    setQuestion(prevQueston =>
      prevQueston.map(q =>
        q.id === questionId ?
          {
            ...q,
            isClicked: true,
            clickedIndex: index
          }
          : q
      )
    )
  }

  function checkAnswer() {

    // Check Answer
    if (!showAnswer) {
      // Every question has been answered
      if (!question.every(q => q.isClicked)) {
        console.log("Please make sure all answer has been answered")
      }
      else {
        setShowAnswer(true)

        // count correct answer
        setCorrectAns(question.filter(q =>
          q.correctIndex() === q.clickedIndex
        ).length)
      }
    }

    // Play Again
    else {
      setCorrectAns(0)
      setShowAnswer(false)
      startQuiz()
    }
  }

  const ques = question.map(q =>
    <Question question={q} key={q.id} setClicked={setClicked} showAnswer={showAnswer} />
  )

  return (
    <>
      {
        // Intro Section
        question.length == 0 ? <Intro startQuiz={startQuiz} />
          :
          // Quiz Section
          <div className="questions--container">
            <div className="questions">
              {ques}
              <div className="bottom">
                {showAnswer &&
                  <p><b>You scored {correctAns}/5 correct answers</b></p>
                }

                <button className="check_answer" onClick={checkAnswer}>
                  {showAnswer ? "Play again" : "Check answers"}
                </button>
              </div>
            </div>
          </div>
      }
    </>
  )
}