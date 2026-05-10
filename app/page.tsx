import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import DonateForm from "@/components/DonateForm";

interface HomepageData {
  pantryName: string;
  tagline?: string;
  hours?: string;
  address?: string;
  contactInfo?: string;
  facebookUrl?: string;
  gallery?: SanityImageSource[];
}

export default async function Home() {
  const { data: homepage } = (await sanityFetch({ query: HOMEPAGE_QUERY })) as {
    data: HomepageData | null;
  };

  if (!homepage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-8">
        <div className="max-w-2xl text-center">
          <h1
            className="mb-6 text-4xl font-bold text-charcoal"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Welcome
          </h1>
          <p className="text-lg text-gray-700">
            Visit{" "}
            <Link href="/studio" className="font-semibold text-primary underline">
              /studio
            </Link>{" "}
            to set up homepage content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <p className="mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-primary-dark">
            <span className="h-px w-6 bg-primary" aria-hidden />
            Food Pantry
            <span className="h-px w-6 bg-primary" aria-hidden />
          </p>
          <h1
            className="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-charcoal sm:text-6xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {homepage.pantryName}
          </h1>
          {homepage.tagline && (
            <p className="mb-12 max-w-sm text-xl leading-relaxed text-gray-800 sm:text-2xl">
              <span className="mr-2 text-primary-dark" aria-hidden>
                &mdash;
              </span>
              {homepage.tagline}
            </p>
          )}
          <DonateForm />
        </div>
      </section>

      {homepage.gallery && homepage.gallery.length > 0 && (
        <section className="px-6 pb-4" aria-label="Photos">
          <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
            {homepage.gallery.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl shadow-md"
              >
                <Image
                  src={urlFor(img).width(400).height(400).fit("crop").url()}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 150px, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-gray-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-md space-y-8">
          {homepage.hours && (
            <div>
              <h2
                className="section-heading mb-4 text-2xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Hours
              </h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800">{homepage.hours}</p>
            </div>
          )}

          {homepage.address && (
            <div>
              <h2
                className="section-heading mb-4 text-2xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Address
              </h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800">{homepage.address}</p>
            </div>
          )}

          {homepage.contactInfo && (
            <div>
              <h2
                className="section-heading mb-4 text-2xl font-bold text-charcoal"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Contact
              </h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800">
                {homepage.contactInfo}
              </p>
            </div>
          )}

          {homepage.facebookUrl && (
            <a
              href={homepage.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold text-charcoal underline underline-offset-4 hover:text-primary-dark"
            >
              Follow us on Facebook →
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
