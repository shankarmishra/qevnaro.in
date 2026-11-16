/**
 * People shown on the About page and used for article bylines.
 * Leave this empty until names and photos are confirmed: the section is hidden
 * rather than showing placeholders.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. /assets/team/name.webp */
  photo?: string;
  linkedin?: string;
}

export const TEAM: TeamMember[] = [];

/** Company facts for the About page and Organization schema. Fill in when confirmed. */
export const COMPANY = {
  foundingYear: '' as string,
  legalName: '' as string,
};
