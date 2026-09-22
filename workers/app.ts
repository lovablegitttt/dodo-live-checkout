import { createRequestHandler } from "react-router";

interface Env {
  ASSETS?: { fetch(request: Request): Promise<Response> | Response };
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: { env: Env; ctx: ExecutionContext };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (env.ASSETS && ["GET", "HEAD"].includes(request.method) && new URL(request.url).pathname.startsWith("/assets/")) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    }
    return requestHandler(request, { cloudflare: { env, ctx } });
  },
};
