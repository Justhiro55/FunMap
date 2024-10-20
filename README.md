# HAM 経路案内プラットフォーム「Funまっぷ」

### プロジェクトセットアップ(React + Vite + go + redis)
インストール方法
```
git clone git@github.com:FISH-HACKATHON/HAM.git
cd HAM
```

#### frontnend
1. 依存関係のインストール
```
cd frontend
npm install
```

2. プロジェクトの起動
```
npm run dev
```
デフォルトでは、http://localhost:5173 で開発サーバーが起動

#### backend

1. プロジェクトディレクトリに移動:
```bash
cd backend
```

2. 依存関係をインストール:
```bash
go mod tidy
```

3. Goプログラムをビルド:
```bash
go build -o main .
```

4. Goサーバーを起動:
```bash
./main
```
