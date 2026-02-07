import { Trophy } from 'lucide-react';

interface AchievementNotificationProps {
  title: string;
  description: string;
}

export function AchievementNotification({ title, description }: AchievementNotificationProps) {
  return (
    <div className="fixed top-24 right-6 z-50 animate-slideInRight">
      <div className="bg-yellow-400 rounded-2xl p-1 shadow-2xl border-4 border-gray-900">
        <div className="bg-white rounded-xl p-5 min-w-[320px]">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 rounded-2xl p-3 animate-bounce border-3 border-gray-900">
              <Trophy className="w-8 h-8 text-gray-900" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-600 font-bold uppercase tracking-wider text-sm">
                  ⭐ Achievement!
                </span>
              </div>
              <h4 className="text-gray-900 font-bold text-xl mb-1">{title}</h4>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
