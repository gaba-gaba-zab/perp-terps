import type { CallToAction } from '~/types';

interface NavLink {
  text: string;
  href: string;
}

export const headerData: { links: NavLink[]; actions: CallToAction[] } = {
  links: [
    { text: 'About', href: '/#about' },
    { text: 'Services', href: '/#services' },
    { text: 'Contact', href: '/#contact' },
  ],
  actions: [{ text: 'Free consultation', href: '/#contact', variant: 'primary' }],
};
