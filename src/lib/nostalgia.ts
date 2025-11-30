/** 年代別の出来事・流行 */
export interface NostalgiaData {
  hit: string;      // ヒット曲・流行語
  news: string;     // 主なニュース
  culture: string;  // 文化・トレンド
}

export const NOSTALGIA_DB: Record<number, NostalgiaData> = {
  // 1980年代
  1980: { hit: '「ダンシング・オールナイト」もんた&ブラザーズ', news: 'モスクワ五輪ボイコット', culture: 'ウォークマン普及' },
  1981: { hit: '「ルビーの指環」寺尾聰', news: 'スペースシャトル初飛行', culture: 'なめ猫ブーム' },
  1982: { hit: '「待つわ」あみん', news: 'ホテルニュージャパン火災', culture: 'E.T.公開' },
  1983: { hit: '「めだかの兄妹」わらべ', news: '東京ディズニーランド開園', culture: 'ファミコン発売' },
  1984: { hit: '「もしも明日が…」わらべ', news: 'グリコ・森永事件', culture: 'エリマキトカゲブーム' },
  1985: { hit: '「恋におちて」小林明子', news: '日航機墜落事故', culture: 'スーパーマリオブラザーズ発売' },
  1986: { hit: '「CHA-CHA-CHA」石井明美', news: 'チェルノブイリ原発事故', culture: 'ドラクエ発売' },
  1987: { hit: '「命くれない」瀬川瑛子', news: '国鉄分割民営化', culture: 'ファイナルファンタジー発売' },
  1988: { hit: '「パラダイス銀河」光GENJI', news: '青函トンネル開通', culture: 'ドラゴンボール人気' },
  1989: { hit: '「Diamonds」プリンセスプリンセス', news: '昭和天皇崩御・平成へ', culture: 'ゲームボーイ発売' },
  // 1990年代
  1990: { hit: '「おどるポンポコリン」B.B.クィーンズ', news: '東西ドイツ統一', culture: 'スーパーファミコン発売' },
  1991: { hit: '「ラブ・ストーリーは突然に」小田和正', news: '湾岸戦争勃発', culture: '東京ラブストーリー大ヒット' },
  1992: { hit: '「君がいるだけで」米米CLUB', news: 'バルセロナ五輪', culture: 'たまごっち前夜' },
  1993: { hit: '「YAH YAH YAH」CHAGE&ASKA', news: 'Jリーグ開幕', culture: '「ポケベル」全盛期' },
  1994: { hit: '「innocent world」Mr.Children', news: '関西国際空港開港', culture: 'プレイステーション発売' },
  1995: { hit: '「LOVE LOVE LOVE」DREAMS COME TRUE', news: '阪神・淡路大震災', culture: 'Windows 95発売' },
  1996: { hit: '「名もなき詩」Mr.Children', news: 'O157集団食中毒', culture: 'たまごっち発売・ポケモン発売' },
  1997: { hit: '「CAN YOU CELEBRATE?」安室奈美恵', news: '消費税5%へ', culture: 'もののけ姫公開' },
  1998: { hit: '「夜空ノムコウ」SMAP', news: '長野冬季五輪', culture: 'iMac発売' },
  1999: { hit: '「だんご3兄弟」', news: '2000年問題騒動', culture: '「だっちゅーの」流行' },
  // 2000年代
  2000: { hit: '「TSUNAMI」サザンオールスターズ', news: 'シドニー五輪・高橋尚子金メダル', culture: 'PS2発売・ミレニアム' },
  2001: { hit: '「Can You Keep A Secret?」宇多田ヒカル', news: 'アメリカ同時多発テロ', culture: '千と千尋の神隠し公開' },
  2002: { hit: '「Life goes on」Dragon Ash', news: '日韓W杯開催', culture: '着うた開始' },
  2003: { hit: '「世界に一つだけの花」SMAP', news: 'イラク戦争開戦', culture: '六本木ヒルズ開業' },
  2004: { hit: '「瞳をとじて」平井堅', news: 'アテネ五輪', culture: 'ニンテンドーDS発売' },
  2005: { hit: '「青春アミーゴ」修二と彰', news: '愛・地球博開催', culture: '「電車男」ブーム' },
  2006: { hit: '「Real Face」KAT-TUN', news: 'トリノ五輪・荒川静香金メダル', culture: 'Wii発売・mixiブーム' },
  2007: { hit: '「千の風になって」秋川雅史', news: '参院選で自民大敗', culture: '初音ミク誕生・iPhone発売' },
  2008: { hit: '「キセキ」GReeeeN', news: '北京五輪・リーマンショック', culture: '「アラフォー」流行語' },
  2009: { hit: '「Believe」嵐', news: '政権交代・民主党政権', culture: '「草食系男子」流行' },
  // 2010年代
  2010: { hit: '「Beginner」AKB48', news: '小惑星探査機「はやぶさ」帰還', culture: 'iPad発売・「ゲゲゲ」流行' },
  2011: { hit: '「フライングゲット」AKB48', news: '東日本大震災', culture: '「なでしこジャパン」W杯優勝' },
  2012: { hit: '「真夏のSounds good!」AKB48', news: 'ロンドン五輪', culture: '「ワイルドだろぉ」流行語' },
  2013: { hit: '「恋するフォーチュンクッキー」AKB48', news: '東京五輪開催決定', culture: '「今でしょ！」「倍返しだ！」' },
  2014: { hit: '「ラブラドール・レトリバー」AKB48', news: '消費税8%へ', culture: '「アナと雪の女王」大ヒット' },
  2015: { hit: '「R.Y.U.S.E.I.」三代目 J Soul Brothers', news: '北陸新幹線開業', culture: '「爆買い」流行語' },
  2016: { hit: '「恋」星野源', news: 'リオ五輪・熊本地震', culture: '「ポケモンGO」大流行・PPAP' },
  2017: { hit: '「打上花火」DAOKO×米津玄師', news: '「忖度」問題', culture: '「インスタ映え」流行語' },
  2018: { hit: '「Lemon」米津玄師', news: '平昌五輪・西日本豪雨', culture: '「そだねー」流行語' },
  2019: { hit: '「Pretender」Official髭男dism', news: '令和へ改元・ラグビーW杯', culture: '「ONE TEAM」流行語' },
  // 2020年代
  2020: { hit: '「紅蓮華」LiSA', news: 'コロナパンデミック・東京五輪延期', culture: '鬼滅の刃ブーム・「3密」' },
  2021: { hit: '「ドライフラワー」優里', news: '東京五輪開催', culture: '「リアル二刀流」大谷翔平' },
  2022: { hit: '「新時代」Ado', news: '安倍元首相銃撃事件', culture: 'ONE PIECE FILM RED' },
  2023: { hit: '「アイドル」YOASOBI', news: 'WBC日本優勝', culture: '「推しの子」ブーム' },
  2024: { hit: '「晩餐歌」tuki.', news: '新紙幣発行・能登半島地震', culture: '大谷翔平50-50達成' },
  2025: { hit: '「ライラック」Mrs. GREEN APPLE', news: '大阪・関西万博開催', culture: 'AI・生成AI普及' },
};

/** 年のノスタルジア情報を取得 */
export function getNostalgia(year: number): NostalgiaData | null {
  return NOSTALGIA_DB[year] || null;
}
