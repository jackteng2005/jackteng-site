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

export const nav = [
  { href: '#problems', label: 'Problems' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Experience' },
  { href: '#demo', label: 'Live demo' },
  { href: '#about', label: 'About' },
] as const;

/**
 * Default enquiry template. Pre-filling the subject and body is what
 * replaces a qualifying contact form: the prospect is prompted for the
 * same fields a form would have collected.
 */
export const enquirySubject = 'Project enquiry';

export const enquiryBody = [
  'Hi Jack,',
  '',
  'Organisation:',
  'What we need:',
  'Rough timeline:',
  'Budget range (if known):',
  'Website (if any):',
  '',
  'Thanks,',
].join('\n');
