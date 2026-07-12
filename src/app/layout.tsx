import type { Metadata } from "next";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/900.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/700-italic.css";
import "./globals.css";

/**
 * 字体说明（docs/research/DESIGN_TOKENS.md）:
 * 原站用 Adobe Fonts(Typekit kit lqg7hdn): arboria + campaign-serif —— 授权字体无法自托管。
 * Poppins ≈ arboria / Playfair Display Italic ≈ campaign-serif italic。
 * 用 @fontsource 本地包而非 next/font/google: 构建机在国内,fonts.googleapis.com 不可达会炸 build。
 * FCC 换肤时整体替换为品牌字体即可。
 */

export const metadata: Metadata = {
  title: "Funshine Career Consulting — Own Our Career Future",
  description:
    "FCC · Boutique Career Agency. We stand by the next generation — personalized career consulting for top offers across Asia-Pacific, North America & the UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // translate="no" + notranslate: 阻止 Chrome 自动翻译把品牌字/逐字标题 span 搅成乱码
    <html lang="en" translate="no" className="notranslate h-full antialiased">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
