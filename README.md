# Insta Clone

Insta Clone Backend

- Prisma
- GraphQL

### JS to TS Migration

- npm i typescript ts-node -D
  - ts-node : babel-node 같은 것인데, ts를 위한 것임
- migrate 하고자 하는 js 파일, 구조를 src 생성 후 이동
  - users/, client, schema, server
- babel.config.js 삭제, tsconfig.json 생성
  - https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html

```javascript
  {
    "compilerOptions": {
      "outDir": "./built",
      "allowJs": true,
      "target": "es5"
    },
    "include": ["./src/**/*"]
  }
```

- package-json 의 scripts 를 babel-node 에서 ts-node 로 변경
- server의 경로를 src/server로 변경
- nodemon 이 js extension만 보고 있으므로, scripts 옵션으로 --ext ts,js 를 추가
- 모든 확장자 명을 ts로 변경
- type 으로 인해 생기는 에러 고치기
