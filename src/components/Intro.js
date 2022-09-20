import React from "react"

export default function Intro(props) {
    return (
        <div className="intro">
            <div>
                <h3>Quizzical</h3>
                <p>Challenge this quiz!</p>

                <button
                    className="start_quiz"
                    onClick={props.startQuiz}>
                    Start quiz
                </button>
            </div>
        </div>
    )
}