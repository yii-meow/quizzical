import React from "react"

export default function Question({ question, setClicked, showAnswer }) {
    return (
        <div className="questions--question">
            <p>{question.question}</p>

            {question.combined_answers.map((ans, index) => {
                return (
                    <button
                        key={index}
                        className={
                            showAnswer
                                ? index === question.correctIndex()
                                    ? "show_correct"
                                    : index === question.clickedIndex
                                        ? "show_incorrect"
                                        : ""

                                : question.isClicked && index === question.clickedIndex
                                    ? "chosen"
                                    : "not_chosen"
                        }
                        disabled={showAnswer ? true : false}
                        onClick={() => setClicked(question.id, index)}
                    >
                        {ans}
                    </button>
                )
            })}
        </div>
    )
}