import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface InteractiveQuizProps {
  questions: Question[];
  onComplete: () => void;
  chapterTitle: string;
}

export function InteractiveQuiz({ questions, onComplete, chapterTitle }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = answeredQuestions.every(a => a);

  const handleSelectAnswer = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
    
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const percentage = Math.round((score / questions.length) * 100);

  if (allAnswered && showFeedback) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-orange-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">Great job finishing the quiz for {chapterTitle}</p>
          
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold text-orange-600 mb-2">{percentage}%</div>
            <p className="text-gray-700">
              You got <span className="font-semibold text-orange-600">{score}</span> out of{' '}
              <span className="font-semibold">{questions.length}</span> questions correct!
            </p>
          </div>

          {percentage >= 80 && (
            <p className="text-lg text-green-700 font-medium mb-6">
              🎉 Excellent work! You have a strong understanding of this chapter!
            </p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-lg text-blue-700 font-medium mb-6">
              👍 Good job! You understand most of the main ideas!
            </p>
          )}
          {percentage < 60 && (
            <p className="text-lg text-orange-700 font-medium mb-6">
              💪 Keep practicing! Try reading the chapter again for better understanding.
            </p>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Retry Quiz
            </button>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Continue to Next Chapter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${showCorrect || showIncorrect ? 'font-medium' : ''}`}>
                      {option}
                    </span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === question.correct ? 'bg-green-50 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'
          }`}>
            <p className={`font-medium ${
              selectedAnswer === question.correct ? 'text-green-800' : 'text-blue-800'
            }`}>
              {selectedAnswer === question.correct
                ? '✓ Correct! Great job!'
                : `The correct answer is: ${question.options[question.correct]}`
              }
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showFeedback ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : !isLastQuestion ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={() => setShowFeedback(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              See Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
