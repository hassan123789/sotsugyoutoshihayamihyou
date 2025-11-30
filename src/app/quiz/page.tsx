'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/components/GoogleAnalytics';

// クイズの質問データ
interface Question {
  id: number;
  question: string;
  options: { text: string; generation: string }[];
  image?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '小学生の頃、一番ハマったゲームは？',
    options: [
      { text: 'ファミコン・スーパーファミコン', generation: 'ice' },
      { text: 'プレステ・ニンテンドー64', generation: 'pressure' },
      { text: 'DS・Wii', generation: 'yutori' },
      { text: 'Switch・スマホゲーム', generation: 'z' },
    ],
  },
  {
    id: 2,
    question: '学生時代の連絡手段といえば？',
    options: [
      { text: 'ポケベル・PHS', generation: 'ice' },
      { text: 'ガラケーのメール・デコメ', generation: 'pressure' },
      { text: 'mixi・前略プロフィール', generation: 'yutori' },
      { text: 'LINE・Instagram DM', generation: 'z' },
    ],
  },
  {
    id: 3,
    question: '青春時代に流行った音楽は？',
    options: [
      { text: '小室ファミリー・GLAY', generation: 'ice' },
      { text: '浜崎あゆみ・宇多田ヒカル', generation: 'pressure' },
      { text: 'AKB48・EXILE', generation: 'yutori' },
      { text: '米津玄師・YOASOBI・Ado', generation: 'z' },
    ],
  },
  {
    id: 4,
    question: '学校で流行ったものは？',
    options: [
      { text: 'たまごっち・ハイパーヨーヨー', generation: 'ice' },
      { text: 'プリクラ・ルーズソックス', generation: 'pressure' },
      { text: 'ニンテンドーDS・ケータイ小説', generation: 'yutori' },
      { text: 'TikTok・Among Us', generation: 'z' },
    ],
  },
  {
    id: 5,
    question: 'テレビで見ていた番組は？',
    options: [
      { text: 'ダウンタウン・ウッチャンナンチャン全盛期', generation: 'ice' },
      { text: '「学校へ行こう！」「めちゃイケ」', generation: 'pressure' },
      { text: '「ヘキサゴン」「リンカーン」', generation: 'yutori' },
      { text: 'YouTube・Netflix（テレビ見ない）', generation: 'z' },
    ],
  },
  {
    id: 6,
    question: '思い出のアニメ・漫画は？',
    options: [
      { text: 'ドラゴンボール・スラムダンク', generation: 'ice' },
      { text: 'ワンピース・NARUTO', generation: 'pressure' },
      { text: '鋼の錬金術師・デスノート', generation: 'yutori' },
      { text: '鬼滅の刃・呪術廻戦・推しの子', generation: 'z' },
    ],
  },
  {
    id: 7,
    question: '就職活動といえば？',
    options: [
      { text: '氷河期で100社以上エントリー', generation: 'ice' },
      { text: 'リクナビ・マイナビ登場期', generation: 'pressure' },
      { text: '「就活うつ」が社会問題に', generation: 'yutori' },
      { text: 'オンライン面接・私服OK', generation: 'z' },
    ],
  },
  {
    id: 8,
    question: '修学旅行の思い出は？',
    options: [
      { text: '写ルンですで撮影、現像が楽しみ', generation: 'ice' },
      { text: 'デジカメで撮りまくり', generation: 'pressure' },
      { text: 'ケータイで写真、その場でメール', generation: 'yutori' },
      { text: 'スマホで動画撮影→TikTokに投稿', generation: 'z' },
    ],
  },
];

// 世代データ
interface GenerationResult {
  id: string;
  name: string;
  years: string;
  description: string;
  characteristics: string[];
  color: string;
  emoji: string;
}

const GENERATIONS: Record<string, GenerationResult> = {
  ice: {
    id: 'ice',
    name: '氷河期世代',
    years: '1975〜1981年生まれ',
    description: 'バブル崩壊後の就職難を経験した「ロスジェネ」世代。逆境に強く、堅実な価値観を持つ。',
    characteristics: [
      '就活で苦労した経験から粘り強い',
      'アナログ→デジタルの変化を体験',
      'コスパ意識が高い',
      '「自己責任」という言葉に敏感',
    ],
    color: 'from-blue-600 to-indigo-700',
    emoji: '🧊',
  },
  pressure: {
    id: 'pressure',
    name: 'プレッシャー世代',
    years: '1982〜1987年生まれ',
    description: '氷河期とゆとりに挟まれた世代。大谷翔平・羽生結弦など「プレッシャーに強い」人材を輩出。',
    characteristics: [
      'プレッシャーに強いメンタル',
      'ガラケー文化の体現者',
      '「失われた20年」を肌で知る',
      'SNS黎明期を経験（mixi世代）',
    ],
    color: 'from-purple-600 to-pink-600',
    emoji: '💪',
  },
  yutori: {
    id: 'yutori',
    name: 'ゆとり世代',
    years: '1988〜1995年生まれ',
    description: '「ゆとり教育」を受けた世代。批判されがちだが、実は多様性を重視する先進的な価値観の持ち主。',
    characteristics: [
      'ワークライフバランス重視',
      '「草食系」と呼ばれた',
      'デジタルネイティブ第一世代',
      '個性と多様性を大切にする',
    ],
    color: 'from-green-500 to-teal-600',
    emoji: '🌱',
  },
  z: {
    id: 'z',
    name: 'Z世代',
    years: '1996〜2009年生まれ',
    description: '生まれた時からインターネットがある「スマホネイティブ」。SNSでの発信力が高く、社会問題への意識も高い。',
    characteristics: [
      'スマホ・SNSが生活の一部',
      '「推し活」「タイパ」重視',
      '環境・社会問題への関心が高い',
      'オンラインでの人間関係に慣れている',
    ],
    color: 'from-cyan-500 to-blue-600',
    emoji: '📱',
  },
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 結果を計算
  const result = useMemo(() => {
    if (!showResult) return null;

    const counts: Record<string, number> = { ice: 0, pressure: 0, yutori: 0, z: 0 };
    answers.forEach(gen => {
      counts[gen] = (counts[gen] || 0) + 1;
    });

    // 最も多い世代を取得
    const maxGen = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a));
    return GENERATIONS[maxGen[0]];
  }, [answers, showResult]);

  const handleAnswer = (generation: string, optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // 0.5秒後に次の質問へ
    setTimeout(() => {
      const newAnswers = [...answers, generation];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        // GA4でイベント送信
        if (typeof trackEvent === 'function') {
          trackEvent('quiz_complete', 'engagement', 'generation_quiz');
        }
      }
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const shareToX = () => {
    if (!result) return;
    const text = `${result.emoji} 私は「${result.name}」でした！\n\n${result.description}\n\n#世代診断 #学歴早見表`;
    const url = 'https://sotsugyoutoshihayamihyou.vercel.app/quiz';
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareToLine = () => {
    if (!result) return;
    const text = `${result.emoji} 私は「${result.name}」でした！\n${result.description}`;
    const url = 'https://sotsugyoutoshihayamihyou.vercel.app/quiz';
    const shareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + url)}`;
    window.open(shareUrl, '_blank');
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary dark:text-blue-300 hover:underline mb-4">
            ← 学歴早見表に戻る
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎯 世代診断クイズ
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            8つの質問であなたの「世代」を診断！
          </p>
        </header>

        {!showResult ? (
          <>
            {/* プログレスバー */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Q{currentQuestion + 1} / {QUESTIONS.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 質問 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {QUESTIONS[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.generation, index)}
                    disabled={selectedOption !== null}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 scale-[1.02]'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-gray-700'
                    } ${selectedOption !== null && selectedOption !== index ? 'opacity-50' : ''}`}
                  >
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : result && (
          /* 結果表示 */
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* 結果ヘッダー */}
            <div className={`bg-gradient-to-r ${result.color} p-8 text-white text-center`}>
              <div className="text-6xl mb-4">{result.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">あなたは...</h2>
              <div className="text-4xl font-black">{result.name}</div>
              <div className="text-lg opacity-90 mt-2">{result.years}</div>
            </div>

            {/* 結果詳細 */}
            <div className="p-6 sm:p-8">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                {result.description}
              </p>

              <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                📋 {result.name}の特徴
              </h3>
              <ul className="space-y-2 mb-8">
                {result.characteristics.map((char, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-purple-500">✓</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>

              {/* シェアボタン */}
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  結果をシェアしよう！
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={shareToX}
                    className="py-3 px-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">𝕏</span>
                    シェア
                  </button>
                  <button
                    onClick={shareToLine}
                    className="py-3 px-4 bg-[#00B900] text-white font-medium rounded-xl hover:bg-[#00A000] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    LINE
                  </button>
                </div>

                <button
                  onClick={resetQuiz}
                  className="w-full py-3 px-4 border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-medium rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  🔄 もう一度診断する
                </button>

                <Link
                  href="/"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl text-center hover:opacity-90 transition-opacity"
                >
                  🎓 学歴早見表で詳しく調べる
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* フッター */}
        <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>※ この診断はエンターテイメント目的です</p>
          <p className="mt-1">
            <Link href="/" className="text-primary dark:text-blue-300 hover:underline">
              学歴早見表
            </Link>
            {' '}|{' '}
            <Link href="/birth" className="text-primary dark:text-blue-300 hover:underline">
              年別早見表
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
