## MakeLog

制作過程を記録するために作成

### 2024/11/20

1. タイマー名について等Purpose of creationに追記

### 2024/11/19

1. タイマー名をタイマー上部の文字に反映させるようにした。
2. 下記エラーにより、page.tsxとnext.config.tsに追記。  
   Hydration failed because the server rendered HTML didn't match the client.  
   As a result this tree will be regenerated on the client.  
   This can happen if a SSR-ed Client Component used
3. Readmeにスクリーンショットを追加
4. 完成

### 2024/11/18

1. 停止させてからリセットする時の円弧の戻りを、一瞬で戻るようにした。

### 2024/11/17

1. タイマー名のinput位置を変更
2. 円弧を太くした
3. カラー、はっきりした色にすると某企業になってしまうので、色相、彩度、明度を変更。
4. 停止させてからリセットすると円弧の戻りがおかしい。

### 2024/11/16

1. 色選択ボタンの位置を変更。

### 2024/11/15

1. 色が某企業のカラーになってしまっていたので変更。
2. 色の選択肢を追加。
3. 色の分割を5→4分割に変更。
4. 色選択ボタンの位置は、現状だと使いにくいので要検討。

### 2024/11/13

1. タイマーの残り時間を、残り時間の％によって色を変える設定にした。

### 2024/11/11

1. タイマーの残り時間によって色を変える設定にした。  
   次回は％と色参考をどこかに表示する機能追加。

### 2024/11/11

1. タイマーの値の選択肢ボタンを追加

### 2024/11/08

1. リセット後にinputと同値だと設定できないエラーに対応

### 2024/11/01

1. リセット→タイマー0に設定
2. 起動時にアラートが出ないようにした

### 2024/10/31

1. Shadcn導入
2. Shadcn:Radix UIなどのアクセシビリティに配慮したUIコンポーネント,  
   Tailwind CSSのようなユーティリティファーストのスタイリングシステムを統合した設計
3. コンポーネントをインストール  
   npx shadcn@latest add button input label alert-dialog
4. rainbow_analog_timer\src\components\uiにファイルが追加された
5. CSSが効かない…と思っていたらlayout.tsxにimport "./globals.css";が無かった。  
   Next.jsのHPにあるinstructionに沿ってテストしたときに抜けたみたい。  
   前も同じような経験がったのですぐ気づけて良かった（しかし繰り返している…）
6. ReactとReact-iconのバージョン競合で下記対策
   npm install --save react@18.3.1 react-dom@18.3.1
7. 空のインターフェースに関するエラー。eslintとコード修正。

### 2024/10/30

1. 作成
