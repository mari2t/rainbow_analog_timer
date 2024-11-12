## MakeLog

制作過程を記録するために作成

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
