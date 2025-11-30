'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '早生まれとは何ですか？',
    answer: '1月1日から4月1日までに生まれた人のことを「早生まれ」と呼びます。早生まれの人は、同じ年度に生まれた遅生まれの人より1学年上になります。例えば、2000年3月生まれの人は1999年4月〜12月生まれの人と同じ学年になります。',
  },
  {
    question: '和暦と西暦の変換はどうすればいいですか？',
    answer: '当サイトでは自動で和暦（令和・平成・昭和）と西暦を変換して表示します。令和は2019年5月1日から、平成は1989年1月8日から、昭和は1926年12月25日から始まりました。',
  },
  {
    question: '浪人や留年がある場合はどうなりますか？',
    answer: '「計算設定」で浪人年数や留年・休学年数を入力できます。これらを考慮した正確な入学・卒業年度を計算します。',
  },
  {
    question: '履歴書にはどのように書けばいいですか？',
    answer: '計算結果が表示されたら「履歴書形式でコピー」ボタンを押すと、履歴書に直接貼り付けられる形式でコピーできます。和暦・西暦・両方の形式から選べます。',
  },
  {
    question: '大学院まで計算できますか？',
    answer: 'はい、「大学等」の設定で「大学院修士まで」や「大学院博士まで」を選択すると、大学院の入学・卒業年度も計算できます。',
  },
  {
    question: '計算結果を保存できますか？',
    answer: '入力した内容は自動的にブラウザに保存されます。次回アクセス時に自動的に復元されます。また、URLをシェアすることで、同じ計算結果を他の人と共有することもできます。',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 
        className="text-xl font-bold mb-6 text-center"
        style={{ color: 'var(--color-text)' }}
      >
        よくある質問
      </h2>
      
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div 
            key={index}
            className="card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
              style={{ color: 'var(--color-text)' }}
            >
              <span className="font-medium">{item.question}</span>
              <svg 
                className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                style={{ color: 'var(--color-text-muted)' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openIndex === index && (
              <div 
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// FAQ用のJSON-LDデータをエクスポート
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
