import {render, screen, fireEvent} from "@testing-library/react"
import {describe, it, expect, vi} from "vitest"

import QuizCard from "../components/QuizCard.jsx"

const mockQuiz = {
    title: "World Cup Trivia",
    sport: "Football",
    description: "Test your football knowledge",
    questionsCount: 15,
    accent: "#4CAF50",
    equipmentImg: "football",
}

describe("QuizCard", () => {

    it("renders quiz information", () => {
        render(
            <QuizCard
                quiz={mockQuiz}
                delay={0}
                onStart={() => {
                }}
            />
        )

        expect(
            screen.getByText("World Cup Trivia")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Football")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Test your football knowledge")
        ).toBeInTheDocument()

        expect(
            screen.getByText("15 Qs")
        ).toBeInTheDocument()
    })


    it("calls onStart when card is clicked", () => {
        const onStart = vi.fn()

        render(
            <QuizCard
                quiz={mockQuiz}
                delay={0}
                onStart={onStart}
            />
        )

        fireEvent.click(
            screen.getByText("World Cup Trivia")
        )

        expect(onStart).toHaveBeenCalledTimes(1)
    })


    it("calls onStart when Start Quiz button is clicked", () => {
        const onStart = vi.fn()

        render(
            <QuizCard
                quiz={mockQuiz}
                delay={0}
                onStart={onStart}
            />
        )

        fireEvent.click(
            screen.getByRole("button", {
                name: /start quiz/i
            })
        )

        expect(onStart).toHaveBeenCalledTimes(1)
    })


    it("uses default question count when questionsCount is missing", () => {
        const quizWithoutCount = {
            ...mockQuiz,
            questionsCount: undefined,
        }

        render(
            <QuizCard
                quiz={quizWithoutCount}
                delay={0}
                onStart={() => {
                }}
            />
        )


        expect(
            screen.getByText("10 Qs")
        ).toBeInTheDocument()
    })

})