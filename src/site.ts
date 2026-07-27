/**
 * Single source of truth for identity, contact and positioning strings.
 *
 * The published address is split into user/domain so the complete string
 * never appears literally anywhere in the built HTML — see EmailLink.astro
 * for how it is reassembled in the browser.
 */
export const site = {
  url: 'https://jackteng.com',
  name: 'Jack Teng',
  descriptor: 'AI & Web Systems Developer',
  location: 'Sydney, Australia',
  region: 'NSW',
  country: 'AU',

  emailUser: 'hello',
  emailDomain: 'jackteng.com',

  // Leave blank to omit the link entirely rather than ship a dead URL.
  linkedin: '',
  github: '',

  /** Areas served, used for the ProfessionalService structured data. */
  areasServed: ['Sydney', 'New South Wales', 'Australia', 'New Zealand'],
} as const;

/** Obfuscated form used in the no-JS fallback. */
export const emailPlain = `${site.emailUser} [at] ${site.emailDomain}`;

/** Base64 of the real address, decoded client-side. */
export const emailEncoded = Buffer.from(
  `${site.emailUser}@${site.emailDomain}`,
  'utf8'
).toString('base64');

/**
 * Root-relative rather than bare fragments: the nav renders on /demo too,
 * where a bare `#problems` would point at a section that does not exist on
 * that page and silently do nothing.
 */
export const nav = [
  { href: '/#problems', label: 'Problems' },
  { href: '/#services', label: 'Services' },
  { href: '/#approach', label: 'Approach' },
  { href: '/demo', label: 'Demo' },
  { href: '/#about', label: 'About' },
] as const;

/**
 * The enquiry template that used to prefill a mailto: subject and body was
 * removed along with the mailto links. The same prompts are now printed in
 * the contact section itself, where every visitor sees them rather than only
 * those with a working mail client.
 */
