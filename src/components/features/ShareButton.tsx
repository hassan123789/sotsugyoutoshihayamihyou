'use client';

import { useState, useCallback } from 'react';
import { useLocale } from '@/lib/i18n';

interface ShareButtonProps {
  getShareData: () => { url: string; text: string } | null;
}

export function ShareButton({ getShareData }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { t } = useLocale();

  const handleShare = useCallback(async () => {
    const data = getShareData();
    if (!data) {
      setToastMessage(t.resultPlaceholder);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const { url, text } = data;

    // Web Share APIが使える場合
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.siteName,
          text,
          url,
        });
        return;
      } catch (err) {
        // ユーザーがキャンセルした場合は何もしない
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // フォールバック: シェアメニューを表示
    setShowShareMenu(true);
  }, [getShareData, t]);

  const handleTwitterShare = useCallback(() => {
    const data = getShareData();
    if (!data) return;

    const { url, text } = data;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=学歴早見表,就活,履歴書`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    setShowShareMenu(false);
  }, [getShareData]);

  const handleLineShare = useCallback(() => {
    const data = getShareData();
    if (!data) return;

    const { url, text } = data;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(lineUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    setShowShareMenu(false);
  }, [getShareData]);

  const handleFacebookShare = useCallback(() => {
    const data = getShareData();
    if (!data) return;

    const { url } = data;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    setShowShareMenu(false);
  }, [getShareData]);

  const handleCopyLink = useCallback(async () => {
    const data = getShareData();
    if (!data) return;

    try {
      await navigator.clipboard.writeText(data.url);
      setToastMessage(t.copied);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setShowShareMenu(false);
    } catch {
      setToastMessage('Copy failed');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [getShareData, t]);

  return (
    <>
      <div className="flex gap-2">
        {/* メインシェアボタン */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {t.share}
        </button>

        {/* X(Twitter)シェアボタン */}
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
          style={{
            background: '#000',
            color: '#fff'
          }}
          aria-label={t.shareOnX}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LINEシェアボタン */}
        <button
          type="button"
          onClick={handleLineShare}
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
          style={{
            background: '#06C755',
            color: '#fff'
          }}
          aria-label="LINEでシェア"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
        </button>
      </div>

      {/* シェアメニュー（モーダル） */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setShowShareMenu(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div 
            className="relative w-full sm:w-96 p-6 rounded-t-2xl sm:rounded-2xl shadow-2xl"
            style={{ background: 'var(--color-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-center" style={{ color: 'var(--color-text)' }}>
              シェアする
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* X(Twitter) */}
              <button
                onClick={handleTwitterShare}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-black/5"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>X</span>
              </button>

              {/* LINE */}
              <button
                onClick={handleLineShare}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-black/5"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: '#06C755' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>LINE</span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleFacebookShare}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-black/5"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: '#1877F2' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Facebook</span>
              </button>

              {/* コピー */}
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-black/5"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>コピー</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareMenu(false)}
              className="w-full py-3 rounded-xl font-medium transition-all"
              style={{ 
                background: 'var(--color-border)', 
                color: 'var(--color-text)' 
              }}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

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
