## Getting Started

First, create local application on bitrix24 with `Your handler path*`:[http://localhost:3000/home](http://localhost:3000/home) then copy bitrix24 domain, client id and client secret into .env file:

```bash
BITRIX24_DOMAIN={BITRIX24_DOMAIN}
APP_ID={CLIENT_ID}
APP_SECRET={CLIENT_SECRET}
```

Second, install the dependencies:

```bash
npm install
# or
yarn
```

Next, run the server:

```bash
npm run dev
# or
yarn dev
```

Use ngrok to public URL for http port 3030 of server:

```bash
ngrok http 3030
```

Copy and use server url on client
