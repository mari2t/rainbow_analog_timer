## MakeLog

制作過程を記録するために作成

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

### 2024/10/30

1. 作成
