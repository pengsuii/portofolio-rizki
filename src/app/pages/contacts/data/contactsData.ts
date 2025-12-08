export interface Contact {
  id: number;
  type: 'email' | 'linkedin' | 'github' | 'x' | 'whatsapp' | 'other';
  label: string;
  value: string;
  url: string;
  icon?: string;
}

export const contactsData: Contact[] = [
  {
    id: 1,
    type: 'email',
    label: 'Email',
    value: 'rizkifaizal125@gmail.com',
    url: 'mailto:rizkifaizal125@gmail.com',
  },
  {
    id: 2,
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'rizkifaizaliriansyah',
    url: 'https://www.linkedin.com/in/rizkifaizaliriansyah',
  },
  {
    id: 3,
    type: 'github',
    label: 'GitHub',
    value: 'pengsuii',
    url: 'https://github.com/pengsuii',
  },
  {
    id: 4,
    type: 'x',
    label: 'x',
    value: '@sifenx_',
    url: 'https://twitter.com',
  },
];

