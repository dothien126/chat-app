/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_CLIENT_URL: string;
  readonly VITE_SOCKET_URL: string;
  // more env variables...
  readonly VITE_NAME_COOKIE: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_NAME_ID: string;
  readonly VITE_PARAM_ID: string;
  readonly VITE_DOMAIN_AFF: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
