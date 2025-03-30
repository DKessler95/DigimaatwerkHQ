declare module 'netlify-cms-proxy-server' {
  export function middleware(options: {
    rootPaths: Record<string, string>;
    publicPath: string;
    distPath: string;
    logger?: Console;
    security?: {
      loginRoute: string;
      authenticator: (email: string, password: string) => Promise<{ token: string; email: string } | null>;
    };
  }): (app: any) => void;
}