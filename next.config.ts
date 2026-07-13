import type { NextConfig } from "next";

/**
 * GitHub Pages 静态部署配置。
 * - output: "export" → 生成纯静态 out/，无需 Node 运行时。
 * - basePath/assetPrefix: 子路径部署（项目页 /<repo>/）时给 _next 资源加前缀；
 *   由 CI 的 PAGES_BASE_PATH 环境变量注入，本地 dev 不设→留空（根路径）。
 * - 组件内 <img src>、内联 mask url() 一律用相对路径（相对文档，自动跟随 basePath），
 *   不依赖此 basePath；此处的 basePath 只为 Next 自身的 _next chunk 前缀服务。
 * - images.unoptimized: 静态导出必须（无优化服务器）。
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
