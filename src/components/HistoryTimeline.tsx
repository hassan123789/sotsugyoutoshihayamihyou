'use client';

import type { AcademicEvent } from '@/lib/types';
import { getNostalgia } from '@/lib/nostalgia';
import { getSchoolIcon, toWareki } from '@/lib/academic';

interface HistoryTimelineProps {
  events: AcademicEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        📜 学歴タイムライン
      </h2>

      <div className="relative">
        {/* タイムラインの縦線 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

        <div className="space-y-6">
          {events.map((item, index) => {
            const nostalgia = getNostalgia(item.year);
            const icon = getSchoolIcon(item.schoolType);
            const isLast = index === events.length - 1;

            return (
              <div
                key={`${item.year}-${item.event}-${index}`}
                className="relative pl-16 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* タイムラインのドット */}
                <div className="absolute left-4 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-800 shadow-lg" />

                {/* カード */}
                <div
                  className={`relative overflow-hidden rounded-xl p-4 transition-all hover:scale-[1.02] ${
                    isLast
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600'
                      : 'bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* 年度ヘッダー */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">
                          {item.year}年（{toWareki(item.year, item.month)}）
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.month}月
                        </div>
                      </div>
                    </div>
                    {isLast && (
                      <span className="px-3 py-1 bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-xs font-bold rounded-full">
                        最新
                      </span>
                    )}
                  </div>

                  {/* イベント */}
                  <div className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {item.event}
                  </div>

                  {/* 年齢 */}
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {item.age}歳
                    {item.isEarlyBorn && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        早生まれ
                      </span>
                    )}
                  </div>

                  {/* ノスタルジア */}
                  {nostalgia && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-2">
                        ✨ この年の出来事
                      </div>
                      <div className="space-y-2 text-xs">
                        {nostalgia.hit && (
                          <div className="flex items-start gap-2">
                            <span className="text-pink-500 flex-shrink-0">🎵</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {nostalgia.hit}
                            </span>
                          </div>
                        )}
                        {nostalgia.culture && (
                          <div className="flex items-start gap-2">
                            <span className="text-blue-500 flex-shrink-0">📺</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {nostalgia.culture}
                            </span>
                          </div>
                        )}
                        {nostalgia.news && (
                          <div className="flex items-start gap-2">
                            <span className="text-orange-500 flex-shrink-0">📰</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {nostalgia.news}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ReverseResultProps {
  graduationYear: number;
  schoolLabel: string;
  earliest: number;
  latest: number;
  earliestWareki: string;
  latestWareki: string;
  delayYears: number;
  hasExtraYears: boolean;
}

export function ReverseResult({
  graduationYear,
  schoolLabel,
  earliest,
  latest,
  earliestWareki,
  latestWareki,
  delayYears,
  hasExtraYears,
}: ReverseResultProps) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        🔍 逆算結果
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="text-center mb-4">
          <div className="text-lg text-gray-600 dark:text-gray-400">
            {graduationYear}年に{schoolLabel}を卒業した場合
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 flex-wrap">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              遅生まれ（4/2〜12/31）
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {earliest}年
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              （{earliestWareki}）
            </div>
          </div>

          <div className="text-2xl text-gray-400">〜</div>

          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              早生まれ（1/1〜4/1）
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {latest}年
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              （{latestWareki}）
            </div>
          </div>
        </div>

        {(delayYears > 0 || hasExtraYears) && (
          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 text-center text-sm text-gray-500 dark:text-gray-400">
            ※ 浪人・留年・休学を考慮した場合の生年です
          </div>
        )}
      </div>
    </div>
  );
}
