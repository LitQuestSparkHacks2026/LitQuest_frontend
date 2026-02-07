import { Book, Lock, Play, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { libraryBooks } from '../data/bookData';

interface LibraryProps {
  onSelectBook: (bookId: string) => void;
}

export function Library({ onSelectBook }: LibraryProps) {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500 rounded-2xl">
              <Book className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">LitQuest</h1>
              <p className="text-gray-600 text-lg">Learn through interactive stories!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Card */}
        <div className="bg-orange-100 rounded-3xl p-8 mb-12 border-4 border-orange-500">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Reader! 👋</h2>
              <p className="text-gray-700 text-lg">
                Pick a book to start your adventure. Each story has pictures, choices, and different reading levels just for you!
              </p>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {libraryBooks.map((book) => (
            <div
              key={book.id}
              className={`bg-white rounded-3xl overflow-hidden border-4 border-gray-900 shadow-lg transition-transform ${
                book.available 
                  ? 'hover:scale-105 cursor-pointer' 
                  : 'opacity-60'
              }`}
              onClick={() => book.available && onSelectBook(book.id)}
            >
              {/* Book Cover */}
              <div 
                className="h-64 relative flex items-center justify-center"
                style={{ backgroundColor: book.color }}
              >
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {book.title}
                  </h3>
                </div>
                
                {/* Status Badge */}
                {book.available ? (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 border-3 border-white shadow-lg">
                    <Play className="w-5 h-5" />
                    READY!
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 border-3 border-white">
                    <Lock className="w-5 h-5" />
                    Soon
                  </div>
                )}

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full font-bold text-sm border-2 border-gray-900">
                  {book.difficulty}
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                <p className="text-orange-600 font-bold mb-2">by {book.author}</p>
                <p className="text-gray-700 mb-4">{book.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-600">
                    📖 {book.chapters} Chapters
                  </div>
                  {book.available && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBook(book.id);
                      }}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold flex items-center gap-2 border-3 border-gray-900 shadow-md transition-all"
                    >
                      <Play className="w-5 h-5" />
                      Start
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center bg-purple-100 rounded-3xl p-8 border-4 border-purple-500">
          <p className="text-gray-700 text-lg font-semibold">
            🎉 More amazing stories coming soon! Check back later for new adventures.
          </p>
        </div>
      </div>
    </div>
  );
}
