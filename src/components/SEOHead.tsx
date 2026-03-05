import { Helmet } from 'react-helmet-async';
import type { SEOMetadata } from '@/lib/seo';

interface SEOHeadProps {
  metadata: SEOMetadata;
  breadcrumbs?: Array<{ name: string; url: string }>;
  schema?: object | object[];
}

export function SEOHead({ metadata, breadcrumbs, schema }: SEOHeadProps) {
  const siteUrl = 'https://catsimage.pages.dev';
  const canonicalUrl = metadata.canonical || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const ogImage = metadata.ogImage || 'https://cataas.com/cat';

  // Generate breadcrumb schema if provided
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`
    }))
  } : null;

  // Combine schemas
  const allSchemas = [
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : [])
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords} />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.ogType || 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CatSEO Pro" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={metadata.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {allSchemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}
        </script>
      )}
    </Helmet>
  );
}

// FAQ Component for structured data
interface FAQSectionProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section className="py-12">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Breadcrumb component
interface BreadcrumbProps {
  items: Array<{ name: string; url: string }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <li>
          <a href="/" className="hover:text-orange-600 transition-colors">
            Home
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.name}</span>
            ) : (
              <a
                href={item.url}
                className="hover:text-orange-600 transition-colors"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
