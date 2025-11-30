'use client';

import { useLocale } from '@/lib/i18n';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { locale } = useLocale();

  const content = {
    ja: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日: 2024年11月30日',
      sections: [
        {
          title: '1. はじめに',
          content: '学歴早見表（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーでは、本アプリにおける情報の取り扱いについて説明します。',
        },
        {
          title: '2. 収集する情報',
          content: '本アプリは、ユーザーの個人情報を収集しません。\n\n• ユーザー登録は不要です\n• 名前、メールアドレス、電話番号などの個人情報は収集しません\n• 入力された生年月日などの情報はサーバーに送信されず、すべてお使いのデバイス上でのみ処理されます',
        },
        {
          title: '3. データの保存',
          content: '本アプリで入力されたデータは、お使いのデバイスのローカルストレージにのみ保存される場合があります。このデータはサーバーに送信されることはありません。',
        },
        {
          title: '4. 第三者へのデータ共有',
          content: '本アプリは、ユーザーの情報を第三者と共有することはありません。',
        },
        {
          title: '5. 分析ツール',
          content: '本アプリでは、サービス改善のためにGoogle Analyticsを使用する場合があります。Google Analyticsは匿名の利用統計情報を収集しますが、個人を特定する情報は収集しません。詳しくはGoogleのプライバシーポリシーをご確認ください。',
        },
        {
          title: '6. 広告',
          content: '本アプリでは、Google AdSenseによる広告を表示する場合があります。広告配信のためにCookieが使用される場合がありますが、個人を特定する情報は収集されません。',
        },
        {
          title: '7. お子様のプライバシー',
          content: '本アプリは13歳未満のお子様を対象としていません。13歳未満のお子様から意図的に個人情報を収集することはありません。',
        },
        {
          title: '8. プライバシーポリシーの変更',
          content: '本プライバシーポリシーは、必要に応じて更新されることがあります。変更があった場合は、本ページにて通知します。',
        },
        {
          title: '9. お問い合わせ',
          content: '本プライバシーポリシーに関するご質問がございましたら、アプリのサポートページよりお問い合わせください。',
        },
      ],
      backToHome: 'ホームに戻る',
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: November 30, 2024',
      sections: [
        {
          title: '1. Introduction',
          content: 'Academic History Calculator (the "App") respects user privacy and is committed to protecting personal information. This Privacy Policy explains how we handle information in the App.',
        },
        {
          title: '2. Information We Collect',
          content: 'This App does not collect personal information.\n\n• No user registration required\n• We do not collect names, email addresses, phone numbers, or other personal information\n• Information entered (such as birth dates) is processed only on your device and is not sent to any server',
        },
        {
          title: '3. Data Storage',
          content: 'Data entered in the App may be stored only in your device\'s local storage. This data is never transmitted to our servers.',
        },
        {
          title: '4. Data Sharing with Third Parties',
          content: 'This App does not share user information with third parties.',
        },
        {
          title: '5. Analytics',
          content: 'This App may use Google Analytics for service improvement. Google Analytics collects anonymous usage statistics but does not collect personally identifiable information. Please refer to Google\'s Privacy Policy for details.',
        },
        {
          title: '6. Advertising',
          content: 'This App may display advertisements through Google AdSense. Cookies may be used for ad delivery, but no personally identifiable information is collected.',
        },
        {
          title: '7. Children\'s Privacy',
          content: 'This App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.',
        },
        {
          title: '8. Changes to This Privacy Policy',
          content: 'This Privacy Policy may be updated as necessary. Any changes will be notified on this page.',
        },
        {
          title: '9. Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact us through the app\'s support page.',
        },
      ],
      backToHome: 'Back to Home',
    },
    zh: {
      title: '隐私政策',
      lastUpdated: '最后更新：2024年11月30日',
      sections: [
        {
          title: '1. 简介',
          content: '学历速查表（以下简称"本应用"）尊重用户隐私，致力于保护个人信息。本隐私政策说明本应用如何处理信息。',
        },
        {
          title: '2. 收集的信息',
          content: '本应用不收集个人信息。\n\n• 无需用户注册\n• 我们不收集姓名、电子邮件地址、电话号码或其他个人信息\n• 输入的信息（如出生日期）仅在您的设备上处理，不会发送到任何服务器',
        },
        {
          title: '3. 数据存储',
          content: '在本应用中输入的数据可能仅存储在您设备的本地存储中。这些数据绝不会传输到我们的服务器。',
        },
        {
          title: '4. 与第三方共享数据',
          content: '本应用不与第三方共享用户信息。',
        },
        {
          title: '5. 分析工具',
          content: '本应用可能使用Google Analytics来改进服务。Google Analytics收集匿名使用统计信息，但不收集个人身份信息。详情请参阅Google的隐私政策。',
        },
        {
          title: '6. 广告',
          content: '本应用可能通过Google AdSense显示广告。Cookie可能用于广告投放，但不会收集个人身份信息。',
        },
        {
          title: '7. 儿童隐私',
          content: '本应用不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。',
        },
        {
          title: '8. 隐私政策的变更',
          content: '本隐私政策可能会根据需要进行更新。任何变更将在本页面上通知。',
        },
        {
          title: '9. 联系我们',
          content: '如果您对本隐私政策有任何疑问，请通过应用的支持页面与我们联系。',
        },
      ],
      backToHome: '返回首页',
    },
    ko: {
      title: '개인정보처리방침',
      lastUpdated: '최종 업데이트: 2024년 11월 30일',
      sections: [
        {
          title: '1. 소개',
          content: '학력 조회표(이하 "본 앱")는 사용자의 개인정보를 존중하고 보호하기 위해 노력합니다. 본 개인정보처리방침은 본 앱에서 정보를 처리하는 방법에 대해 설명합니다.',
        },
        {
          title: '2. 수집하는 정보',
          content: '본 앱은 개인정보를 수집하지 않습니다.\n\n• 사용자 등록이 필요하지 않습니다\n• 이름, 이메일 주소, 전화번호 또는 기타 개인정보를 수집하지 않습니다\n• 입력된 정보(예: 생년월일)는 사용자의 기기에서만 처리되며 서버로 전송되지 않습니다',
        },
        {
          title: '3. 데이터 저장',
          content: '본 앱에 입력된 데이터는 사용자 기기의 로컬 저장소에만 저장될 수 있습니다. 이 데이터는 서버로 전송되지 않습니다.',
        },
        {
          title: '4. 제3자와의 데이터 공유',
          content: '본 앱은 사용자 정보를 제3자와 공유하지 않습니다.',
        },
        {
          title: '5. 분석 도구',
          content: '본 앱은 서비스 개선을 위해 Google Analytics를 사용할 수 있습니다. Google Analytics는 익명의 사용 통계를 수집하지만 개인 식별 정보는 수집하지 않습니다. 자세한 내용은 Google의 개인정보처리방침을 참조하세요.',
        },
        {
          title: '6. 광고',
          content: '본 앱은 Google AdSense를 통해 광고를 표시할 수 있습니다. 광고 제공을 위해 쿠키가 사용될 수 있지만 개인 식별 정보는 수집되지 않습니다.',
        },
        {
          title: '7. 아동의 개인정보',
          content: '본 앱은 13세 미만의 아동을 대상으로 하지 않습니다. 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.',
        },
        {
          title: '8. 개인정보처리방침의 변경',
          content: '본 개인정보처리방침은 필요에 따라 업데이트될 수 있습니다. 변경 사항이 있을 경우 이 페이지에서 알려드립니다.',
        },
        {
          title: '9. 문의하기',
          content: '본 개인정보처리방침에 대한 질문이 있으시면 앱의 지원 페이지를 통해 문의해 주세요.',
        },
      ],
      backToHome: '홈으로 돌아가기',
    },
  };

  const t = content[locale] || content.ja;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {t.lastUpdated}
        </p>

        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <section key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ← {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
