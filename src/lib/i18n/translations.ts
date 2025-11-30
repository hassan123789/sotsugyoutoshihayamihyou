// ========== 多言語対応 ==========

export type Locale = 'ja' | 'en' | 'zh' | 'ko';

export const locales: Locale[] = ['ja', 'en', 'zh', 'ko'];
export const defaultLocale: Locale = 'ja';

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  ko: '한국어',
};

export interface Translations {
  // メタ
  siteName: string;
  siteDescription: string;
  
  // ヘッダー
  title: string;
  subtitle: string;
  
  // フォーム
  calcMode: string;
  forwardMode: string;
  reverseMode: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthDate: string;
  graduationYear: string;
  schoolType: string;
  universityDuration: string;
  delayYears: string;
  calcSettings: string;
  advancedOptions: string;
  highschoolExtra: string;
  universityExtra: string;
  graduateExtra: string;
  
  // 学校種別
  elementary: string;
  juniorHigh: string;
  highSchool: string;
  university: string;
  graduate: string;
  
  // 大学オプション
  noUniversity: string;
  twoYearCollege: string;
  threeYearVocational: string;
  fourYearUniversity: string;
  sixYearMedical: string;
  mastersDegree: string;
  doctoralDegree: string;
  
  // 結果
  timeline: string;
  entrance: string;
  graduation: string;
  age: string;
  ageUnit: string;
  yearUnit: string;
  monthUnit: string;
  dayUnit: string;
  yearHeader: string;
  earlyBorn: string;
  latest: string;
  resultPlaceholder: string;
  reversePlaceholder: string;
  
  // アクション
  copyResume: string;
  downloadPDF: string;
  share: string;
  shareOnX: string;
  shareOnLine: string;
  generateInfographic: string;
  generating: string;
  save: string;
  copied: string;
  
  // 採用担当者向け
  recruiterTitle: string;
  recruiterDescription: string;
  estimatedBirthYear: string;
  reverseCalc: string;
  graduationTable: string;
  currentAge: string;
  birthYearRange: string;
  fiscalYear: string;
  thisYear: string;
  nextYear: string;
  earlyBornCase: string;
  normalCase: string;
  ageNote: string;
  ageRestrictionNote: string;
  earlyBornExplanation: string;
  earlyBornExplanationDetail: string;
  usefulFeatures: string;
  
  // その他
  years: string;
  months: string;
  days: string;
  
  // ナビゲーション
  quiz: string;
  quizDescription: string;
  faq: string;
  relatedTools: string;
  yearlyTable: string;
  yearlyTableDesc: string;
  warekiConverter: string;
  warekiConverterDesc: string;
  ageTable: string;
  ageTableDesc: string;
  recruiter: string;
  recruiterDesc: string;
  backToTop: string;
  useDetailedTool: string;
  
  // FAQ
  faqTitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  
  // 有名人
  celebritiesTitle: string;
  celebritiesSubtitle: string;
  noCelebrities: string;
  
  // 世代あるある
  generationTitle: string;
  generationAruaru: string;
  techMemory: string;
  schoolMemory: string;
  schoolTimeline: string;
  
  // シェアカード
  shareCardTitle: string;
  shareCardSubtitle: string;
  shareCardGenerate: string;
  
  // PDF
  pdfGenerating: string;
  pdfDownload: string;
  pdfFailed: string;
  
  // フッター
  footerNote1: string;
  footerNote2: string;
  
  // クイズ
  quizTitle: string;
  quizSubtitle: string;
  quizQuestion: string;
  quizResult: string;
  quizRetry: string;
  quizShare: string;
  quizYourGeneration: string;
  quizCharacteristics: string;
  startQuiz: string;
  
  // 世代名
  genIceAge: string;
  genPressure: string;
  genYutori: string;
  genZ: string;
  
  // 浪人オプション
  delay0: string;
  delay1: string;
  delay2: string;
  delay3: string;
  
  // 留年オプション
  extra0: string;
  extra1: string;
  extra2: string;
  
  // 逆算
  reverseSchoolType: string;
  juniorGrad: string;
  highschoolGrad: string;
  universityGrad: string;
  
  // 追加ページ
  home: string;
  warekiTitle: string;
  warekiSubtitle: string;
  toWareki: string;
  toSeireki: string;
  inputSeireki: string;
  inputWareki: string;
  convertResult: string;
  eraTable: string;
  eraTableNote: string;
  reiwa: string;
  heisei: string;
  showa: string;
  taisho: string;
  meiji: string;
  
  ageTitle: string;
  ageSubtitle: string;
  calculateAge: string;
  etoZodiac: string;
  eto: string;
  zodiac: string;
  currentAgeLabel: string;
  ageTableNote: string;
  
  birthTitle: string;
  birthSubtitle: string;
  selectBirthYear: string;
  detailedCalc: string;
  
  // CopyButton
  copySuccess: string;
  copyFailed: string;
}

export const translations: Record<Locale, Translations> = {
  ja: {
    siteName: '学歴早見表',
    siteDescription: '生年月日から学歴年表を自動計算',
    title: '卒業年月日 早見表',
    subtitle: '生年月日から学歴年表を自動計算',
    
    calcMode: '計算モード',
    forwardMode: '生年月日 → 学歴',
    reverseMode: '卒業年 → 生年',
    birthYear: '年',
    birthMonth: '月',
    birthDay: '日',
    birthDate: '生年月日',
    graduationYear: '卒業年',
    schoolType: '学校種別',
    universityDuration: '大学修業年数',
    delayYears: '浪人年数',
    calcSettings: '計算設定',
    advancedOptions: '詳細オプション',
    highschoolExtra: '高校留年',
    universityExtra: '大学留年',
    graduateExtra: '大学院留年',
    
    elementary: '小学校',
    juniorHigh: '中学校',
    highSchool: '高等学校',
    university: '大学',
    graduate: '大学院',
    
    noUniversity: '進学しない（高卒）',
    twoYearCollege: '短大・専門学校（2年制）',
    threeYearVocational: '専門学校（3年制）',
    fourYearUniversity: '大学・専門学校（4年制）',
    sixYearMedical: '医学部・薬学部等（6年制）',
    mastersDegree: '大学院修士まで（学部4年+修士2年）',
    doctoralDegree: '大学院博士まで（学部4年+博士5年）',
    
    timeline: '学歴タイムライン',
    entrance: '入学',
    graduation: '卒業',
    age: '歳',
    ageUnit: '歳',
    yearUnit: '年',
    monthUnit: '月',
    dayUnit: '日',
    yearHeader: '西暦',
    earlyBorn: '早生まれ',
    latest: '最新',
    resultPlaceholder: '生年月日を入力すると、学歴タイムラインが表示されます',
    reversePlaceholder: '卒業年を入力すると、推定生年月日が表示されます',
    
    copyResume: '履歴書形式でコピー',
    downloadPDF: 'PDFでダウンロード',
    share: 'シェア',
    shareOnX: 'Xでシェア',
    shareOnLine: 'LINEでシェア',
    generateInfographic: '📱 インフォグラフィック生成',
    generating: '生成中...',
    save: '保存',
    copied: 'コピーしました！',
    
    recruiterTitle: '採用担当者向け 年齢計算ツール',
    recruiterDescription: '卒業年から候補者の生年月日を逆算',
    estimatedBirthYear: '推定生年月日',
    reverseCalc: '卒業年から生年月日を逆算',
    graduationTable: '大学卒業年度 早見表（4年制大学）',
    currentAge: '現在の年齢',
    birthYearRange: '生年月日範囲',
    fiscalYear: '卒業年度',
    thisYear: '今年度',
    nextYear: '来年度',
    earlyBornCase: '早生まれの場合',
    normalCase: '通常の場合',
    ageNote: '※ 浪人・留年がない場合の目安です。実際の年齢は履歴書等でご確認ください。',
    ageRestrictionNote: '募集・採用における年齢制限は原則禁止（雇用対策法）',
    earlyBornExplanation: '早生まれとは？',
    earlyBornExplanationDetail: '1月1日〜4月1日生まれの人のこと。学年では前年度生まれと同じ扱いになります。',
    usefulFeatures: '採用活動に便利な機能',
    
    years: '年',
    months: '月',
    days: '日',
    
    quiz: '世代診断クイズ',
    quizDescription: 'あなたは何世代？',
    faq: 'よくある質問',
    relatedTools: '関連ツール',
    yearlyTable: '年別早見表',
    yearlyTableDesc: '生まれ年から一発検索',
    warekiConverter: '西暦・和暦変換',
    warekiConverterDesc: '令和・平成・昭和を簡単変換',
    ageTable: '年齢早見表',
    ageTableDesc: '年齢・干支・星座を計算',
    recruiter: '採用担当者向け',
    recruiterDesc: '卒業年から年齢逆算',
    backToTop: 'トップページに戻る',
    useDetailedTool: '詳細な学歴計算ツールを使う',
    
    faqTitle: 'よくある質問',
    faq1Q: '早生まれとは何ですか？',
    faq1A: '1月1日〜4月1日に生まれた人のことです。学年では前年度生まれの人と同じ扱いになります。',
    faq2Q: '浪人した場合はどうすればいいですか？',
    faq2A: '「浪人年数」の項目で該当する年数を選択してください。大学入学年度が自動的に調整されます。',
    faq3Q: '留年した場合はどうすればいいですか？',
    faq3A: '「詳細オプション」を開いて、該当する学校の留年年数を選択してください。',
    faq4Q: '海外の学校や通信制の場合は？',
    faq4A: 'このツールは日本の一般的な学制（6-3-3-4制）に基づいています。特殊なケースは個別にご確認ください。',
    
    celebritiesTitle: '同い年の有名人',
    celebritiesSubtitle: 'と同じ学年',
    noCelebrities: '同い年の有名人データがありません',
    
    generationTitle: 'あなたの世代',
    generationAruaru: 'あるある',
    techMemory: 'テクノロジーの思い出',
    schoolMemory: '学校の思い出',
    schoolTimeline: '学校時代の出来事',
    
    shareCardTitle: '同い年診断シェアカード',
    shareCardSubtitle: 'あなたの生まれ年と同い年の有名人をカード画像にして、SNSでシェアしよう！',
    shareCardGenerate: 'シェアカード生成',
    
    pdfGenerating: 'PDF生成中...',
    pdfDownload: 'PDFでダウンロード',
    pdfFailed: 'PDF生成に失敗しました。ブラウザを更新してもう一度お試しください。',
    
    footerNote1: '※ 日本の一般的な学制に基づいて計算しています。',
    footerNote2: '※ 早生まれ（1月1日〜4月1日生まれ）を正しく考慮しています。',
    
    quizTitle: '世代診断クイズ',
    quizSubtitle: 'あなたはどの世代？8つの質問で診断！',
    quizQuestion: '問',
    quizResult: '診断結果',
    quizRetry: 'もう一度診断する',
    quizShare: '結果をシェア',
    quizYourGeneration: 'あなたは',
    quizCharacteristics: 'この世代の特徴',
    startQuiz: 'クイズを始める',
    
    genIceAge: '氷河期世代',
    genPressure: 'プレッシャー世代',
    genYutori: 'ゆとり世代',
    genZ: 'Z世代',
    
    delay0: 'なし（現役）',
    delay1: '1年（一浪）',
    delay2: '2年（二浪）',
    delay3: '3年以上',
    
    extra0: 'なし',
    extra1: '1年',
    extra2: '2年以上',
    
    reverseSchoolType: '卒業学校',
    juniorGrad: '中学卒業',
    highschoolGrad: '高校卒業',
    universityGrad: '大学卒業',
    
    // 追加ページ
    home: 'ホーム',
    warekiTitle: '西暦・和暦 変換ツール',
    warekiSubtitle: '西暦と和暦（令和・平成・昭和・大正・明治）を相互変換',
    toWareki: '西暦 → 和暦',
    toSeireki: '和暦 → 西暦',
    inputSeireki: '西暦を入力',
    inputWareki: '和暦を入力',
    convertResult: '変換結果',
    eraTable: '元号一覧表',
    eraTableNote: '※ 年をまたぐ元号は両方表示されます',
    reiwa: '令和',
    heisei: '平成',
    showa: '昭和',
    taisho: '大正',
    meiji: '明治',
    
    ageTitle: '年齢早見表・年齢計算',
    ageSubtitle: '生年月日から年齢・干支・星座を計算',
    calculateAge: '年齢を計算',
    etoZodiac: '干支・星座',
    eto: '干支',
    zodiac: '星座',
    currentAgeLabel: '現在の年齢',
    ageTableNote: '※ 誕生日前の場合は1歳引いてください',
    
    birthTitle: '年別 学歴早見表',
    birthSubtitle: '生まれ年を選択して入学・卒業年度を確認',
    selectBirthYear: '生まれ年を選択',
    detailedCalc: '詳細な学歴計算',
    
    copySuccess: 'コピーしました！',
    copyFailed: 'コピーに失敗しました',
  },
  
  en: {
    siteName: 'Academic History Calculator',
    siteDescription: 'Calculate academic timeline from birth date',
    title: 'Graduation Date Calculator',
    subtitle: 'Calculate academic timeline from birth date (Japan)',
    
    calcMode: 'Calculation Mode',
    forwardMode: 'Birth Date → Academic History',
    reverseMode: 'Graduation Year → Birth Year',
    birthYear: 'Year',
    birthMonth: 'Month',
    birthDay: 'Day',
    birthDate: 'Date of Birth',
    graduationYear: 'Graduation Year',
    schoolType: 'School Type',
    universityDuration: 'University Duration',
    delayYears: 'Gap Years',
    calcSettings: 'Calculation Settings',
    advancedOptions: 'Advanced Options',
    highschoolExtra: 'High School Extra Years',
    universityExtra: 'University Extra Years',
    graduateExtra: 'Graduate School Extra Years',
    
    elementary: 'Elementary School',
    juniorHigh: 'Junior High School',
    highSchool: 'High School',
    university: 'University',
    graduate: 'Graduate School',
    
    noUniversity: 'No higher education',
    twoYearCollege: 'Junior College (2 years)',
    threeYearVocational: 'Vocational School (3 years)',
    fourYearUniversity: 'University (4 years)',
    sixYearMedical: 'Medical/Pharmacy (6 years)',
    mastersDegree: "Master's Degree (4+2 years)",
    doctoralDegree: 'Doctoral Degree (4+5 years)',
    
    timeline: 'Academic Timeline',
    entrance: 'Entrance',
    graduation: 'Graduation',
    age: 'years old',
    ageUnit: 'y/o',
    yearUnit: '',
    monthUnit: '',
    dayUnit: '',
    yearHeader: 'Year',
    earlyBorn: 'Early-born',
    latest: 'Latest',
    resultPlaceholder: 'Enter your birth date to see your academic timeline',
    reversePlaceholder: 'Enter graduation year to estimate birth date',
    
    copyResume: 'Copy for Resume',
    downloadPDF: 'Download PDF',
    share: 'Share',
    shareOnX: 'Share on X',
    shareOnLine: 'Share on LINE',
    generateInfographic: '📱 Generate Infographic',
    generating: 'Generating...',
    save: 'Save',
    copied: 'Copied!',
    
    recruiterTitle: 'Age Calculator for Recruiters',
    recruiterDescription: 'Estimate birth year from graduation year',
    estimatedBirthYear: 'Estimated Birth Date',
    reverseCalc: 'Estimate birth date from graduation year',
    graduationTable: 'University Graduation Year Table (4-year)',
    currentAge: 'Current Age',
    birthYearRange: 'Birth Date Range',
    fiscalYear: 'Fiscal Year',
    thisYear: 'This Year',
    nextYear: 'Next Year',
    earlyBornCase: 'If early-born',
    normalCase: 'If normal',
    ageNote: '※ This is an estimate without gap years. Please verify with actual documents.',
    ageRestrictionNote: 'Age restrictions in recruitment are generally prohibited',
    earlyBornExplanation: 'What is "Early-born"?',
    earlyBornExplanationDetail: 'People born between Jan 1 - Apr 1. They are in the same grade as those born in the previous fiscal year.',
    usefulFeatures: 'Useful Features for Recruitment',
    
    years: 'Year',
    months: 'Month',
    days: 'Day',
    
    quiz: 'Generation Quiz',
    quizDescription: 'Which generation are you?',
    faq: 'FAQ',
    relatedTools: 'Related Tools',
    yearlyTable: 'Yearly Table',
    yearlyTableDesc: 'Quick search by birth year',
    warekiConverter: 'Japanese Era Converter',
    warekiConverterDesc: 'Convert Reiwa/Heisei/Showa',
    ageTable: 'Age Table',
    ageTableDesc: 'Calculate age, zodiac, and star sign',
    recruiter: 'For Recruiters',
    recruiterDesc: 'Reverse calculate age from graduation',
    backToTop: 'Back to Top',
    useDetailedTool: 'Use detailed academic calculator',
    
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'What is "early-born"?',
    faq1A: 'People born between January 1 and April 1. They are placed in the same grade as those born in the previous fiscal year.',
    faq2Q: 'What if I took a gap year?',
    faq2A: 'Select the number of gap years in the "Gap Years" field. The university entrance year will be adjusted automatically.',
    faq3Q: 'What if I repeated a grade?',
    faq3A: 'Open "Advanced Options" and select the number of extra years for the relevant school level.',
    faq4Q: 'What about overseas or correspondence schools?',
    faq4A: 'This tool is based on the standard Japanese school system (6-3-3-4). Please verify special cases individually.',
    
    celebritiesTitle: 'Same-Age Celebrities',
    celebritiesSubtitle: 'Same grade as',
    noCelebrities: 'No celebrity data available for this year',
    
    generationTitle: 'Your Generation',
    generationAruaru: 'Common Experiences',
    techMemory: 'Tech Memories',
    schoolMemory: 'School Memories',
    schoolTimeline: 'Events During School Years',
    
    shareCardTitle: 'Same-Age Share Card',
    shareCardSubtitle: 'Create a card image with celebrities born in your year and share on SNS!',
    shareCardGenerate: 'Generate Share Card',
    
    pdfGenerating: 'Generating PDF...',
    pdfDownload: 'Download PDF',
    pdfFailed: 'PDF generation failed. Please refresh and try again.',
    
    footerNote1: '※ Calculated based on the standard Japanese school system.',
    footerNote2: '※ Early-born status (Jan 1 - Apr 1) is correctly considered.',
    
    quizTitle: 'Generation Quiz',
    quizSubtitle: 'Which generation are you? Find out in 8 questions!',
    quizQuestion: 'Q',
    quizResult: 'Result',
    quizRetry: 'Try Again',
    quizShare: 'Share Result',
    quizYourGeneration: 'You are',
    quizCharacteristics: 'Characteristics of this generation',
    startQuiz: 'Start Quiz',
    
    genIceAge: 'Ice Age Generation',
    genPressure: 'Pressure Generation',
    genYutori: 'Yutori Generation',
    genZ: 'Gen Z',
    
    delay0: 'None (on-time)',
    delay1: '1 year',
    delay2: '2 years',
    delay3: '3+ years',
    
    extra0: 'None',
    extra1: '1 year',
    extra2: '2+ years',
    
    reverseSchoolType: 'Graduated From',
    juniorGrad: 'Junior High',
    highschoolGrad: 'High School',
    universityGrad: 'University',
    
    // Additional pages
    home: 'Home',
    warekiTitle: 'Japanese Era Converter',
    warekiSubtitle: 'Convert between Western calendar and Japanese eras (Reiwa, Heisei, Showa, Taisho, Meiji)',
    toWareki: 'Western → Japanese Era',
    toSeireki: 'Japanese Era → Western',
    inputSeireki: 'Enter Western year',
    inputWareki: 'Enter Japanese era year',
    convertResult: 'Conversion Result',
    eraTable: 'Era Reference Table',
    eraTableNote: '※ Years spanning multiple eras are shown in both',
    reiwa: 'Reiwa',
    heisei: 'Heisei',
    showa: 'Showa',
    taisho: 'Taisho',
    meiji: 'Meiji',
    
    ageTitle: 'Age Calculator & Reference',
    ageSubtitle: 'Calculate age, zodiac, and horoscope from birth date',
    calculateAge: 'Calculate Age',
    etoZodiac: 'Zodiac & Horoscope',
    eto: 'Chinese Zodiac',
    zodiac: 'Horoscope',
    currentAgeLabel: 'Current Age',
    ageTableNote: '※ Subtract 1 if birthday has not passed yet',
    
    birthTitle: 'Academic History by Birth Year',
    birthSubtitle: 'Select your birth year to see entrance/graduation years',
    selectBirthYear: 'Select Birth Year',
    detailedCalc: 'Detailed Academic Calculation',
    
    copySuccess: 'Copied!',
    copyFailed: 'Copy failed',
  },
  
  zh: {
    siteName: '学历早见表',
    siteDescription: '根据出生日期自动计算学历年表',
    title: '毕业日期早见表',
    subtitle: '根据出生日期自动计算学历年表（日本学制）',
    
    calcMode: '计算模式',
    forwardMode: '出生日期 → 学历',
    reverseMode: '毕业年份 → 出生年份',
    birthYear: '年',
    birthMonth: '月',
    birthDay: '日',
    birthDate: '出生日期',
    graduationYear: '毕业年份',
    schoolType: '学校类型',
    universityDuration: '大学修业年限',
    delayYears: '复读年数',
    calcSettings: '计算设置',
    advancedOptions: '高级选项',
    highschoolExtra: '高中留级',
    universityExtra: '大学留级',
    graduateExtra: '研究生留级',
    
    elementary: '小学',
    juniorHigh: '初中',
    highSchool: '高中',
    university: '大学',
    graduate: '研究生院',
    
    noUniversity: '不升学（高中毕业）',
    twoYearCollege: '专科学校（2年制）',
    threeYearVocational: '职业学校（3年制）',
    fourYearUniversity: '大学（4年制）',
    sixYearMedical: '医学部/药学部（6年制）',
    mastersDegree: '硕士（本科4年+硕士2年）',
    doctoralDegree: '博士（本科4年+博士5年）',
    
    timeline: '学历时间线',
    entrance: '入学',
    graduation: '毕业',
    age: '岁',
    ageUnit: '岁',
    yearUnit: '年',
    monthUnit: '月',
    dayUnit: '日',
    yearHeader: '年份',
    earlyBorn: '早产（4月1日前出生）',
    latest: '最新',
    resultPlaceholder: '输入出生日期后，将显示学历时间线',
    reversePlaceholder: '输入毕业年份后，将显示推算的出生日期',
    
    copyResume: '复制简历格式',
    downloadPDF: '下载PDF',
    share: '分享',
    shareOnX: '分享到X',
    shareOnLine: '分享到LINE',
    generateInfographic: '📱 生成信息图',
    generating: '生成中...',
    save: '保存',
    copied: '已复制！',
    
    recruiterTitle: '招聘人员专用 年龄计算工具',
    recruiterDescription: '根据毕业年份推算应聘者出生日期',
    estimatedBirthYear: '推算出生年份',
    reverseCalc: '从毕业年份推算出生日期',
    graduationTable: '大学毕业年度早见表（4年制）',
    currentAge: '当前年龄',
    birthYearRange: '出生日期范围',
    fiscalYear: '毕业年度',
    thisYear: '今年',
    nextYear: '明年',
    earlyBornCase: '早产的情况',
    normalCase: '正常情况',
    ageNote: '※ 这是没有复读的估算。请以实际材料为准。',
    ageRestrictionNote: '招聘中的年龄限制原则上被禁止',
    earlyBornExplanation: '什么是"早产"？',
    earlyBornExplanationDetail: '指1月1日至4月1日出生的人。他们与上一学年出生的人在同一年级。',
    usefulFeatures: '招聘活动便捷功能',
    
    years: '年',
    months: '月',
    days: '日',
    
    quiz: '世代诊断测试',
    quizDescription: '你是哪个世代？',
    faq: '常见问题',
    relatedTools: '相关工具',
    yearlyTable: '年度早见表',
    yearlyTableDesc: '按出生年份快速搜索',
    warekiConverter: '日本年号转换',
    warekiConverterDesc: '转换令和/平成/昭和',
    ageTable: '年龄早见表',
    ageTableDesc: '计算年龄、生肖和星座',
    recruiter: '招聘人员专用',
    recruiterDesc: '从毕业年份逆算年龄',
    backToTop: '返回首页',
    useDetailedTool: '使用详细学历计算工具',
    
    faqTitle: '常见问题',
    faq1Q: '什么是"早产"？',
    faq1A: '指1月1日至4月1日出生的人。他们与上一学年出生的人在同一年级。',
    faq2Q: '如果复读了怎么办？',
    faq2A: '在"复读年数"中选择相应的年数。大学入学年份将自动调整。',
    faq3Q: '如果留级了怎么办？',
    faq3A: '打开"高级选项"，选择相应学校的留级年数。',
    faq4Q: '海外学校或函授学校呢？',
    faq4A: '本工具基于日本标准学制（6-3-3-4制）。特殊情况请个别确认。',
    
    celebritiesTitle: '同龄名人',
    celebritiesSubtitle: '同年级',
    noCelebrities: '没有该年份的名人数据',
    
    generationTitle: '你的世代',
    generationAruaru: '共同经历',
    techMemory: '科技记忆',
    schoolMemory: '学校记忆',
    schoolTimeline: '学校时期的大事',
    
    shareCardTitle: '同龄分享卡',
    shareCardSubtitle: '将您的出生年份和同龄名人制作成卡片图像，分享到社交媒体！',
    shareCardGenerate: '生成分享卡',
    
    pdfGenerating: '正在生成PDF...',
    pdfDownload: '下载PDF',
    pdfFailed: 'PDF生成失败。请刷新页面重试。',
    
    footerNote1: '※ 基于日本标准学制计算。',
    footerNote2: '※ 已正确考虑早产情况（1月1日〜4月1日出生）。',
    
    quizTitle: '世代诊断测试',
    quizSubtitle: '你是哪个世代？8个问题告诉你！',
    quizQuestion: '问题',
    quizResult: '诊断结果',
    quizRetry: '重新测试',
    quizShare: '分享结果',
    quizYourGeneration: '你是',
    quizCharacteristics: '这个世代的特征',
    startQuiz: '开始测试',
    
    genIceAge: '冰河期世代',
    genPressure: '压力世代',
    genYutori: '宽松世代',
    genZ: 'Z世代',
    
    delay0: '无（应届）',
    delay1: '1年',
    delay2: '2年',
    delay3: '3年以上',
    
    extra0: '无',
    extra1: '1年',
    extra2: '2年以上',
    
    reverseSchoolType: '毕业学校',
    juniorGrad: '初中毕业',
    highschoolGrad: '高中毕业',
    universityGrad: '大学毕业',
    
    // Additional pages
    home: '首页',
    warekiTitle: '日本年号转换器',
    warekiSubtitle: '西历与日本年号（令和、平成、昭和、大正、明治）互转',
    toWareki: '西历 → 年号',
    toSeireki: '年号 → 西历',
    inputSeireki: '输入西历年份',
    inputWareki: '输入年号年份',
    convertResult: '转换结果',
    eraTable: '年号对照表',
    eraTableNote: '※ 跨越多个年号的年份会显示在两处',
    reiwa: '令和',
    heisei: '平成',
    showa: '昭和',
    taisho: '大正',
    meiji: '明治',
    
    ageTitle: '年龄早见表',
    ageSubtitle: '根据出生日期计算年龄、生肖、星座',
    calculateAge: '计算年龄',
    etoZodiac: '生肖与星座',
    eto: '生肖',
    zodiac: '星座',
    currentAgeLabel: '当前年龄',
    ageTableNote: '※ 如果生日还没到，请减1岁',
    
    birthTitle: '各年出生者学历早见表',
    birthSubtitle: '选择出生年份查看入学·毕业年份',
    selectBirthYear: '选择出生年份',
    detailedCalc: '详细学历计算',
    
    copySuccess: '已复制！',
    copyFailed: '复制失败',
  },
  
  ko: {
    siteName: '학력 조견표',
    siteDescription: '생년월일로 학력 연표 자동 계산',
    title: '졸업 연도 조견표',
    subtitle: '생년월일로 학력 연표 자동 계산 (일본 학제)',
    
    calcMode: '계산 모드',
    forwardMode: '생년월일 → 학력',
    reverseMode: '졸업 연도 → 생년',
    birthYear: '년',
    birthMonth: '월',
    birthDay: '일',
    birthDate: '생년월일',
    graduationYear: '졸업 연도',
    schoolType: '학교 종류',
    universityDuration: '대학 수업 연한',
    delayYears: '재수 년수',
    calcSettings: '계산 설정',
    advancedOptions: '상세 옵션',
    highschoolExtra: '고등학교 유급',
    universityExtra: '대학 유급',
    graduateExtra: '대학원 유급',
    
    elementary: '초등학교',
    juniorHigh: '중학교',
    highSchool: '고등학교',
    university: '대학교',
    graduate: '대학원',
    
    noUniversity: '진학하지 않음 (고졸)',
    twoYearCollege: '전문대학 (2년제)',
    threeYearVocational: '직업학교 (3년제)',
    fourYearUniversity: '대학교 (4년제)',
    sixYearMedical: '의학부/약학부 (6년제)',
    mastersDegree: '석사 (학부 4년 + 석사 2년)',
    doctoralDegree: '박사 (학부 4년 + 박사 5년)',
    
    timeline: '학력 타임라인',
    entrance: '입학',
    graduation: '졸업',
    age: '세',
    ageUnit: '세',
    yearUnit: '년',
    monthUnit: '월',
    dayUnit: '일',
    yearHeader: '년도',
    earlyBorn: '빠른 생일 (4월 1일 이전 출생)',
    latest: '최신',
    resultPlaceholder: '생년월일을 입력하면 학력 타임라인이 표시됩니다',
    reversePlaceholder: '졸업 연도를 입력하면 추정 생년월일이 표시됩니다',
    
    copyResume: '이력서 형식으로 복사',
    downloadPDF: 'PDF 다운로드',
    share: '공유',
    shareOnX: 'X에서 공유',
    shareOnLine: 'LINE에서 공유',
    generateInfographic: '📱 인포그래픽 생성',
    generating: '생성 중...',
    save: '저장',
    copied: '복사되었습니다!',
    
    recruiterTitle: '채용 담당자용 나이 계산 도구',
    recruiterDescription: '졸업 연도로 지원자 생년월일 역산',
    estimatedBirthYear: '추정 생년월일',
    reverseCalc: '졸업 연도로 생년월일 역산',
    graduationTable: '대학 졸업 연도 조견표 (4년제)',
    currentAge: '현재 나이',
    birthYearRange: '생년월일 범위',
    fiscalYear: '졸업 연도',
    thisYear: '올해',
    nextYear: '내년',
    earlyBornCase: '빠른 생일의 경우',
    normalCase: '일반적인 경우',
    ageNote: '※ 재수나 유급이 없는 경우의 추정입니다. 실제 서류로 확인해 주세요.',
    ageRestrictionNote: '채용 시 나이 제한은 원칙적으로 금지됩니다',
    earlyBornExplanation: '"빠른 생일"이란?',
    earlyBornExplanationDetail: '1월 1일부터 4월 1일 사이에 태어난 사람입니다. 전년도 출생자와 같은 학년에 배치됩니다.',
    usefulFeatures: '채용 활동 편의 기능',
    
    years: '년',
    months: '월',
    days: '일',
    
    quiz: '세대 진단 퀴즈',
    quizDescription: '당신은 어떤 세대?',
    faq: '자주 묻는 질문',
    relatedTools: '관련 도구',
    yearlyTable: '연도별 조견표',
    yearlyTableDesc: '출생 연도로 빠른 검색',
    warekiConverter: '일본 연호 변환',
    warekiConverterDesc: '레이와/헤이세이/쇼와 변환',
    ageTable: '나이 조견표',
    ageTableDesc: '나이, 띠, 별자리 계산',
    recruiter: '채용 담당자용',
    recruiterDesc: '졸업 연도로 나이 역산',
    backToTop: '홈으로 돌아가기',
    useDetailedTool: '상세 학력 계산 도구 사용',
    
    faqTitle: '자주 묻는 질문',
    faq1Q: '"빠른 생일"이란 무엇인가요?',
    faq1A: '1월 1일부터 4월 1일 사이에 태어난 사람입니다. 전년도 출생자와 같은 학년에 배치됩니다.',
    faq2Q: '재수했을 경우 어떻게 하나요?',
    faq2A: '"재수 년수"에서 해당 년수를 선택하세요. 대학 입학 연도가 자동으로 조정됩니다.',
    faq3Q: '유급했을 경우 어떻게 하나요?',
    faq3A: '"상세 옵션"을 열고 해당 학교의 유급 년수를 선택하세요.',
    faq4Q: '해외 학교나 통신 학교는요?',
    faq4A: '이 도구는 일본 표준 학제(6-3-3-4제)를 기준으로 합니다. 특수한 경우는 개별적으로 확인해 주세요.',
    
    celebritiesTitle: '동갑 유명인',
    celebritiesSubtitle: '동학년',
    noCelebrities: '해당 연도의 유명인 데이터가 없습니다',
    
    generationTitle: '당신의 세대',
    generationAruaru: '공통 경험',
    techMemory: '기술 추억',
    schoolMemory: '학교 추억',
    schoolTimeline: '학창 시절의 일',
    
    shareCardTitle: '동갑 공유 카드',
    shareCardSubtitle: '같은 해에 태어난 유명인과 함께 카드 이미지를 만들어 SNS에 공유하세요!',
    shareCardGenerate: '공유 카드 생성',
    
    pdfGenerating: 'PDF 생성 중...',
    pdfDownload: 'PDF 다운로드',
    pdfFailed: 'PDF 생성에 실패했습니다. 새로고침 후 다시 시도해 주세요.',
    
    footerNote1: '※ 일본 표준 학제를 기준으로 계산합니다.',
    footerNote2: '※ 빠른 생일 (1월 1일〜4월 1일 출생)을 올바르게 고려합니다.',
    
    quizTitle: '세대 진단 퀴즈',
    quizSubtitle: '당신은 어떤 세대? 8가지 질문으로 진단!',
    quizQuestion: '질문',
    quizResult: '진단 결과',
    quizRetry: '다시 진단하기',
    quizShare: '결과 공유',
    quizYourGeneration: '당신은',
    quizCharacteristics: '이 세대의 특징',
    startQuiz: '퀴즈 시작',
    
    genIceAge: '빙하기 세대',
    genPressure: '압박 세대',
    genYutori: '유토리 세대',
    genZ: 'Z세대',
    
    delay0: '없음 (현역)',
    delay1: '1년',
    delay2: '2년',
    delay3: '3년 이상',
    
    extra0: '없음',
    extra1: '1년',
    extra2: '2년 이상',
    
    reverseSchoolType: '졸업 학교',
    juniorGrad: '중학교 졸업',
    highschoolGrad: '고등학교 졸업',
    universityGrad: '대학 졸업',
    
    // Additional pages
    home: '홈',
    warekiTitle: '일본 연호 변환기',
    warekiSubtitle: '서력과 일본 연호(레이와, 헤이세이, 쇼와, 다이쇼, 메이지) 상호 변환',
    toWareki: '서력 → 연호',
    toSeireki: '연호 → 서력',
    inputSeireki: '서력 연도 입력',
    inputWareki: '연호 연도 입력',
    convertResult: '변환 결과',
    eraTable: '연호 대조표',
    eraTableNote: '※ 여러 연호에 걸친 해는 양쪽에 표시됩니다',
    reiwa: '레이와',
    heisei: '헤이세이',
    showa: '쇼와',
    taisho: '다이쇼',
    meiji: '메이지',
    
    ageTitle: '나이 조견표',
    ageSubtitle: '생년월일로 나이, 띠, 별자리 계산',
    calculateAge: '나이 계산',
    etoZodiac: '띠 & 별자리',
    eto: '띠',
    zodiac: '별자리',
    currentAgeLabel: '현재 나이',
    ageTableNote: '※ 생일이 지나지 않았으면 1살 빼세요',
    
    birthTitle: '출생 연도별 학력 조견표',
    birthSubtitle: '출생 연도를 선택하여 입학·졸업 연도 확인',
    selectBirthYear: '출생 연도 선택',
    detailedCalc: '상세 학력 계산',
    
    copySuccess: '복사 완료!',
    copyFailed: '복사 실패',
  },
};

export function getTranslation(locale: Locale): Translations {
  return translations[locale] || translations.ja;
}
