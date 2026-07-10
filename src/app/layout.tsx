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
  title: "dabbledee by Deena",
  description:
    "An infinite horizontal experience — branding, coaching & fine art.",
  icons: {
    icon: "/seo/65f7d2958d3d97e8055ab304_favicon.ico",
    apple: "/seo/65f7d28c9882c799b3d18509_new-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
