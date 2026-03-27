import { CONTACTS, ORGANIZATION, PEOPLE } from "./entities";
import { getSiteUrl, localizedPath } from "./site";

export type JsonLdNode = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageSchemaInput = {
  locale: string;
  path: string;
  name: string;
  description: string;
  type?: string;
  mainEntity?: Record<string, string>;
  about?: Array<Record<string, string>>;
  mentions?: Array<Record<string, string>>;
  breadcrumbId?: string;
};

const SITE_NAME = ORGANIZATION.name;

export const ORGANIZATION_ID = `${getSiteUrl().origin}/#organization`;
export const WEBSITE_ID = `${getSiteUrl().origin}/#website`;
export const MAXIM_GARBAR_ID = `${getSiteUrl().origin}/#person-maxim-garbar`;
export const VITALIY_BAKHMAT_ID = `${getSiteUrl().origin}/#person-vitaliy-bakhmat`;
export const VADIM_VLADYMTSEV_ID = `${getSiteUrl().origin}/#person-vadim-vladymtsev`;

export function absoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}

export function localizedAbsoluteUrl(locale: string, pathname = "/") {
  return absoluteUrl(localizedPath(locale, pathname));
}

export function schemaId(locale: string, pathname: string, suffix: string) {
  return `${localizedAbsoluteUrl(locale, pathname)}#${suffix}`;
}

export function getOrganizationSchema(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg"),
    },
    email: CONTACTS.salesEmail,
    telephone: CONTACTS.phoneE164,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACTS.salesEmail,
        telephone: CONTACTS.phoneE164,
        availableLanguage: ["ru", "en"],
      },
    ],
  };
}

export function getWebsiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: ["ru", "en"],
  };
}

export function buildPageSchema({
  locale,
  path,
  name,
  description,
  type = "WebPage",
  mainEntity,
  about,
  mentions,
  breadcrumbId,
}: PageSchemaInput): JsonLdNode {
  return {
    "@type": type,
    "@id": schemaId(locale, path, "webpage"),
    url: localizedAbsoluteUrl(locale, path),
    name,
    description,
    inLanguage: locale === "ru" ? "ru" : "en",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    ...(breadcrumbId
      ? {
          breadcrumb: {
            "@id": breadcrumbId,
          },
        }
      : {}),
    ...(mainEntity ? { mainEntity } : {}),
    ...(about && about.length ? { about } : {}),
    ...(mentions && mentions.length ? { mentions } : {}),
  };
}

export function buildBreadcrumbSchema(locale: string, path: string, items: BreadcrumbItem[]): JsonLdNode {
  const breadcrumbId = schemaId(locale, path, "breadcrumb");

  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedAbsoluteUrl(locale, item.path),
    })),
  };
}

export function getLeadershipSchemas() {
  return [
    {
      "@type": "Person",
      "@id": MAXIM_GARBAR_ID,
      name: PEOPLE.maximGarbar.name,
      jobTitle: PEOPLE.maximGarbar.jobTitle,
      image: absoluteUrl(PEOPLE.maximGarbar.imagePath),
      worksFor: {
        "@id": ORGANIZATION_ID,
      },
    },
    {
      "@type": "Person",
      "@id": VITALIY_BAKHMAT_ID,
      name: PEOPLE.vitaliyBakhmat.name,
      jobTitle: PEOPLE.vitaliyBakhmat.jobTitle,
      image: absoluteUrl(PEOPLE.vitaliyBakhmat.imagePath),
      worksFor: {
        "@id": ORGANIZATION_ID,
      },
      sameAs: [PEOPLE.vitaliyBakhmat.linkedInUrl],
    },
    {
      "@type": "Person",
      "@id": VADIM_VLADYMTSEV_ID,
      name: PEOPLE.vadimVladymtsev.name,
      jobTitle: PEOPLE.vadimVladymtsev.jobTitle,
      image: absoluteUrl(PEOPLE.vadimVladymtsev.imagePath),
      worksFor: {
        "@id": ORGANIZATION_ID,
      },
      url: PEOPLE.vadimVladymtsev.profileUrl,
      sameAs: [PEOPLE.vadimVladymtsev.profileUrl],
    },
  ] satisfies JsonLdNode[];
}

export function getContactPersonSchema(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": VITALIY_BAKHMAT_ID,
    name: PEOPLE.vitaliyBakhmat.name,
    jobTitle: PEOPLE.vitaliyBakhmat.jobTitle,
    image: absoluteUrl(PEOPLE.vitaliyBakhmat.imagePath),
    worksFor: {
      "@id": ORGANIZATION_ID,
    },
    sameAs: [PEOPLE.vitaliyBakhmat.linkedInUrl],
    email: CONTACTS.salesEmail,
    telephone: CONTACTS.phoneE164,
  };
}

export function buildItemListSchema(
  id: string,
  name: string,
  items: Array<{ name: string; url?: string }>,
): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": id,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
