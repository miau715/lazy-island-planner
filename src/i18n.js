import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'zh-TW': {
    translation: {
      'This is a simple tool for Animal Crossing': '這是一個給懶人用的《集合啦！動物森友會》島嶼規劃工具。',
      'Upload your map screenshot to start': '上傳你擷取的島嶼地圖畫面（如下圖）即可開始，',
      'or you can': '也可以',
      'try with my map': '先用我的地圖試試看',
      'period': '。',
      'This is for desktop browser': '（建議於桌面版瀏覽器中使用，在行動裝置中可能無法正常操作。）',

      'Upload image': '上傳圖檔',
      'or': '或',
      'Use the URL of uploaded image': '使用已上傳的圖片連結：',
      'Confirm': '確定',
      'Sorry this seems not a correct map image': '抱歉，這好像不是正確的地圖截圖故無法使用。解析度應為 1280 x 720 px。',
      'Sorry this seems not a correct map image url': '抱歉，這好像不是正確的地圖截圖連結。可在圖片上按右鍵「複製圖片位址」再貼上。',
      'Sorry can not get image from URL': '抱歉，此圖片無法經由連結取得，請先下載再用上傳的方式使用。',

      'info': '說明頁',
      'download map': '下載地圖',

      'This is a very simple tool': '這是個功能非常陽春的懶人工具，',
      'No undo': '沒有回復功能，只能重新整理回到開始畫面讀取檔案從頭再來；',
      'No save': '也不能儲存編輯到一半的狀態，只能把成品下載成圖檔。',
      'You can try other great tools': '如果你覺得這個破工具很難用，可以試試看其他專業開發者做的高級工具：',
      'Close': '關閉'
    }
  },
  'en': {
    translation: {
      'This is a simple tool for Animal Crossing': 'This is a simple island planning tool for "Animal Crossing: New Horizons."',
      'Upload your map screenshot to start': 'Upload the screenshot of your island map (like the image below）to start, ',
      'or you can': 'or you can ',
      'try with my map': 'try with my map',
      'period': '.',
      'This is for desktop browser': '(Strongly recommend to open in desktop browser. Might be very buggy in mobile browser.)',

      'Upload image': 'Upload image',
      'or': 'Or',
      'Use the URL of uploaded image': 'Use the URL of your uploaded image:',
      'Confirm': 'Confirm',
      'Sorry this seems not a correct map image': 'Sorry, this seems not a correct map image. The resolution should be 1280 x 720 px.',
      'Sorry this seems not a correct map image url': 'Sorry, this seems not a correct map image URL. You can right click the image then "Copy Image Address."',
      'Sorry can not get image from URL': 'Sorry, this image can\'t be processed through URL, please download the image then use "Upload image."',

      'Info': 'Info',
      'Download map': 'Download map',

      'This is a very simple tool': 'This is a very simple tool. ',
      'No undo': '"No undo feature." You can only reload the page and start from the beginning. ',
      'No save': 'Also, "No save feature." You can only download the image file.',
      'You can try other great tools': 'If this tool is too lame for you, you can try these great tools that made by skilled developers:',
      'Close': 'Close'
    }
  },
  'ja': {
    translation: {
      'This is a simple tool for Animal Crossing': 'これはシンプルな「あつまれ どうぶつの森」の島の構想ツールです。',
      'Upload your map screenshot to start': '自分の島のスクリーンショット（下図のような）をアップロードして始めてください。',
      'or you can': '',
      'try with my map': '下図を使って体験したい人はこちら',
      'period': '。',
      'This is for desktop browser': '（デスクトップブラウザ向け。モバイルブラウザでは使えない可能性が高いです。）',

      'Upload image': 'アップロード',
      'or': 'または',
      'Use the URL of uploaded image': 'SNSに投稿した画像のURLを使用：',
      'Confirm': '確定',
      'Sorry this seems not a correct map image': 'すみません、これは正しいスクリーンショットではなさそうです。ご利用可能な画像サイズは 1280 x 720 ピクセルとなります。',
      'Sorry this seems not a correct map image url': 'すみません、これは正しいURLではなさそうです。画像を右クリックして、「画像のURLをコピー」をしてください。',
      'Sorry can not get image from URL': 'すみません、この画像はURLから読み込めません。一回ダウンロードして、「アップロード」を使ってください。',

      'info': '説明',
      'download map': '地図をダウンロード',

      'This is a very simple tool': 'これはとてもシンプルなツールです。',
      'No undo': '元に戻す機能がありません。リロードして最初からやり直すしかできません。',
      'No save': 'セーブ機能もありません。画像のダウンロードしかできません。',
      'You can try other great tools': 'もしより本格的なツールを使いたいなら、優秀な開発者が作ったこちらのツールを試してみてください：',
      'Close': '閉じる'
    }
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;