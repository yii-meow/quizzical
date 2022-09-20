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
                                ? index === question.clickedIndex ?

                                    index === question.correctIndex()
                                        ? "show_correct"
                                        : "show_incorrect"

                                    : index === question.correctIndex() ? "show_correct" : ""

                                : question.isClicked && index === question.clickedIndex
                                    ? "chosen"
                                    : "not_chosen"
                        }

                        onClick={() => setClicked(question.id, index)}
                    >
                        {ans}
                    </button>
                )
            })}
        </div>
    )
}