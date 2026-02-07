import { CheckCircle, ArrowRight } from 'lucide-react';

interface ChoiceOption {
  text: string;
  feedback: string;
  points?: number;
}

interface InteractiveChoiceProps {
  choice: {
    prompt: string;
    options: ChoiceOption[];
  };
  onSelect: (index: number, points: number) => void;
  selectedIndex: number | null;
  choiceSelected: boolean;
  onContinue: () => void;
}

export function InteractiveChoice({ 
  choice, 
  onSelect, 
  selectedIndex, 
  choiceSelected,
  onContinue 
}: InteractiveChoiceProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 border-4 border-gray-900 shadow-2xl">
          {/* Prompt */}
          <div className="mb-6 text-center">
            <div className="text-4xl mb-3">🤔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {choice.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {choice.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              const showFeedback = choiceSelected && isSelected;
              const hasPoints = (option.points || 0) > 0;

              return (
                <div key={index}>
                  <button
                    onClick={() => !choiceSelected && onSelect(index, option.points || 0)}
                    disabled={choiceSelected}
                    className={`w-full text-left p-5 rounded-2xl border-3 transition-all transform ${
                      isSelected
                        ? hasPoints
                          ? 'bg-green-200 border-green-600 scale-105 shadow-lg'
                          : 'bg-orange-200 border-orange-600 scale-105 shadow-lg'
                        : 'bg-gray-100 border-gray-900 hover:bg-gray-200 hover:scale-102'
                    } ${choiceSelected ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                          isSelected
                            ? hasPoints
                              ? 'bg-green-500 text-white border-green-700'
                              : 'bg-orange-500 text-white border-orange-700'
                            : 'bg-white text-gray-900 border-gray-900'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900 font-bold text-lg">{option.text}</span>
                      </div>
                      
                      {showFeedback && (
                        <div className="ml-3">
                          {hasPoints ? (
                            <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full border-2 border-green-700">
                              <CheckCircle className="w-5 h-5 text-white" />
                              <span className="text-white font-bold">+{option.points} pts</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-orange-500 px-4 py-2 rounded-full border-2 border-orange-700">
                              <span className="text-white font-bold">+{option.points || 0} pts</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Feedback */}
                  {showFeedback && (
                    <div className={`mt-3 ml-16 p-4 rounded-xl border-3 ${
                      hasPoints ? 'bg-green-100 border-green-500' : 'bg-blue-100 border-blue-500'
                    }`}>
                      <p className="text-gray-900 font-semibold reading-text">
                        {option.feedback}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          {choiceSelected && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={onContinue}
                className="flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl transition-all transform hover:scale-105 shadow-lg font-bold text-lg border-3 border-gray-900"
              >
                <span>Continue Story</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}