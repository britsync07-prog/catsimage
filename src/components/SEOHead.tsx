import type { SEOMetadata } from '@/lib/seo';

interface SEOHeadProps {
  metadata: SEOMetadata;
  breadcrumbs?: Array<{ name: string; url: string }>;
  schema?: object | object[];
}

export function SEOHead(_props: SEOHeadProps) {
  return null;
}

export function FAQSection({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <section className="py-12">
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

export function Breadcrumb(_props: { items: Array<{ name: string; url: string }> }) {
  return null;
}
