'use client';

import { useState, useCallback } from 'react';

interface ShareButtonProps {
  getShareData: () => { url: string; text: string } | null;
}

export function ShareButton({ getShareData }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShare = useCallback(async () => {
    const data = getShareData();
    if (!data) {
      setToastMessage('シェアするデータがありません');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const { url, text } = data;

    // Web Share APIが使える場合
    if (navigator.share) {
      try {
        await navigator.share({
          title: '学歴早見表 - 計算結果',
          text,
          url,
        });
        return;
      } catch (err) {
        // ユーザーがキャンセルした場合は何もしない
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // フォールバック: URLをコピー
    try {
      await navigator.clipboard.writeText(url);
      setToastMessage('URLをコピーしました');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      setToastMessage('コピーに失敗しました');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [getShareData]);

  const handleTwitterShare = useCallback(() => {
    const data = getShareData();
    if (!data) return;

    const { url, text } = data;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }, [getShareData]);

  return (
    <>
      <div className="flex gap-2">
        {/* シェアボタン */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          URLをシェア
        </button>

        {/* Xシェアボタン */}
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all"
          style={{
            background: '#000',
            color: '#fff'
          }}
          aria-label="Xでシェア"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>

      {/* トースト通知 */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-toast-in">
          <div
            className="px-6 py-3 rounded-xl shadow-xl font-medium"
            style={{
              background: 'var(--color-text)',
              color: 'var(--color-bg)'
            }}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
}
