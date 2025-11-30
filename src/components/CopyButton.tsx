'use client';

import { useState, useCallback } from 'react';

interface CopyButtonProps {
  getText: () => string;
  label?: string;
  className?: string;
}

export function CopyButton({
  getText,
  label = '履歴書形式でコピー',
  className = '',
}: CopyButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopy = useCallback(async () => {
    const text = getText();
    if (!text) {
      setToastMessage('コピーするデータがありません');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('クリップボードにコピーしました！');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      // フォールバック
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setToastMessage('クリップボードにコピーしました！');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch {
        setToastMessage('コピーに失敗しました');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    }
  }, [getText]);

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`
          inline-flex items-center gap-2 px-6 py-3
          bg-gradient-to-r from-green-500 to-emerald-500
          hover:from-green-600 hover:to-emerald-600
          text-white font-medium rounded-xl
          shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          transition-all duration-200
          ${className}
        `}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        {label}
      </button>

      {/* トースト通知 */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-toast-in">
          <div className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl shadow-2xl font-medium">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
