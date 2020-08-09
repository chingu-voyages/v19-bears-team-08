export type LinkType = {
  to: string;
  text: string;
};

export const main: LinkType[] = [
  { to: '/about', text: 'About' },
  { to: '/faq', text: 'FAQ' },
  { to: '/pricing', text: 'Pricing' },
  { to: '/schedule', text: 'Schedule' },
  { to: '/howitworks', text: 'How It Works' },
  { to: '/showcase', text: 'Showcase' },
  { to: '/projects/open', text: 'Open Projects' },
];

export const auth: LinkType[] = [
  { to: '/login', text: 'Log In' },
  { to: '/signup', text: 'Sign Up' },
];

export const restricted: LinkType[] = [
  { to: '/profile', text: 'Profile' },
  { to: '/settings', text: 'Settings' },
  { to: '/logout', text: 'Log Out' },
];
