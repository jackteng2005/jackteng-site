/**
 * Shared UI microcopy for the two site languages.
 *
 * Page content (headings, body copy, FAQs) lives in each page file, hand
 * written for its audience rather than translated line-by-line — see
 * src/pages/zh/index.astro. This file only holds the small strings that
 * recur across components (Nav, Footer, Base, Seo, EmailLink) so they do
 * not drift out of sync between the two versions of each component call.
 */
export type Lang = 'en' | 'zh';

export const ui = {
  en: {
    htmlLang: 'en-AU',
    ogLocale: 'en_AU',
    skipToContent: 'Skip to content',
    homeHref: '/',
    homeAriaLabel: 'Jack Teng — home',
    getInTouch: 'Get in touch',
    location: 'Sydney, Australia',
    builtIn: (year: number) => `© ${year} Jack Teng. Built in Sydney.`,
    switchLabel: '中文',
    switchAriaLabel: 'View this page in Chinese',
    orWriteTo: 'Or write to',
    wechatLabel: 'WeChat',
  },
  zh: {
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
    skipToContent: '跳转到主要内容',
    homeHref: '/zh/',
    homeAriaLabel: 'Jack Teng — 首页',
    getInTouch: '联系我',
    location: '澳大利亚 · 悉尼',
    builtIn: (year: number) => `© ${year} Jack Teng,悉尼制作`,
    switchLabel: 'English',
    switchAriaLabel: '切换到英文版本',
    orWriteTo: '也可以直接写邮件到',
    wechatLabel: '微信',
  },
} as const;
