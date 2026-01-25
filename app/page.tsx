import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY, ANNOUNCEMENTS_QUERY, MOBILE_PANTRY_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/Navigation";

interface HomepageData {
  pantryName: string;
  tagline?: string;
  mainDescription?: any[];
  hours?: string;
  address?: string;
  contactInfo?: string;
  donationLink?: string;
  donationQr?: any;
  gallery?: any[];
}

interface Announcement {
  _id: string;
  title: string;
  date: string;
  content?: any[];
  image?: any;
}

interface MobilePantrySchedule {
  title: string;
  description?: string;
  location?: string;
  time?: string;
  dates?: string[];
  frequency?: string;
}

export default async function Home() {
  const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY }) as { data: HomepageData | null };
  const { data: announcements } = await sanityFetch({ query: ANNOUNCEMENTS_QUERY }) as { data: Announcement[] | null };
  const { data: mobilePantry } = await sanityFetch({ query: MOBILE_PANTRY_QUERY }) as { data: MobilePantrySchedule | null };

  if (!homepage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 p-8">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-stone-900" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Welcome
          </h1>
          <p className="mb-8 text-2xl text-stone-600 leading-relaxed">
            Visit <a href="/studio" className="text-primary hover:text-primary-dark font-semibold underline">/studio</a> to create your homepage content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero Section - Clean & Impactful */}
      <section className="relative min-h-[85vh] flex items-center bg-charcoal text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=1080&fit=crop"
            alt="Fresh vegetables and produce"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/70 to-charcoal/90"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-5xl">
            <p className="text-primary font-bold text-sm sm:text-base mb-8 tracking-[0.2em] uppercase">
              Serving Eudora with dignity
            </p>

            <h1
              className="hero-heading mb-10 text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black leading-[0.95]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {homepage.pantryName}
            </h1>

            {homepage.tagline && (
              <p className="mb-14 text-2xl sm:text-3xl md:text-4xl text-white/95 font-light leading-[1.4] max-w-3xl tracking-wide">
                {homepage.tagline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-5">
              {homepage.donationLink && (
                <a
                  href={homepage.donationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-charcoal px-10 py-5 text-lg font-bold tracking-wide transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Donate Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
              <a
                href="#about"
                className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/60 hover:border-white px-10 py-5 text-lg font-bold tracking-wide transition-all duration-300 rounded-full"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-24 lg:mt-32 grid grid-cols-3 gap-8 lg:gap-16 max-w-4xl">
            <div className="border-l-4 border-primary pl-6">
              <div className="text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>500+</div>
              <div className="text-white/80 text-sm lg:text-base font-medium uppercase tracking-wider">Families Served</div>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <div className="text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>12</div>
              <div className="text-white/80 text-sm lg:text-base font-medium uppercase tracking-wider">Years Strong</div>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <div className="text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>100%</div>
              <div className="text-white/80 text-sm lg:text-base font-medium uppercase tracking-wider">Volunteer Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section - Clean & Impactful */}
      {homepage.donationLink && (
        <section id="donate" className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-primary text-charcoal">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="font-semibold text-base mb-6 tracking-wide uppercase">
              Support Our Mission
            </p>

            <h2
              className="mb-8 lg:mb-10 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Every Donation Makes a Difference
            </h2>

            <p className="mb-12 text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
              Your support helps us serve families in our community with dignity and compassion
            </p>

            <a
              href={homepage.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-gray-800 text-white px-10 py-5 text-xl font-semibold transition-all duration-300 rounded-lg mb-16"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Donate Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {homepage.donationQr && (
              <div className="inline-block bg-white/80 p-8 rounded-lg mb-16">
                <Image
                  src={urlFor(homepage.donationQr).width(300).height(300).url()}
                  alt="Donation QR Code"
                  width={300}
                  height={300}
                  className="rounded-lg w-56 h-56"
                />
                <p className="mt-4 text-base font-semibold">Scan to Donate</p>
              </div>
            )}

            {/* Impact stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-12">
              <div className="bg-white/20 p-8 rounded-lg">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>$50</div>
                <div className="text-base">Feeds a family for a week</div>
              </div>
              <div className="bg-white/20 p-8 rounded-lg">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>$100</div>
                <div className="text-base">Provides monthly essentials</div>
              </div>
              <div className="bg-white/20 p-8 rounded-lg">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>$500</div>
                <div className="text-base">Supports 10 families</div>
              </div>
            </div>

            {/* Trust text */}
            <p className="text-sm opacity-80 max-w-2xl mx-auto">
              501(c)(3) Nonprofit • Tax Deductible • 100% of donations go directly to serving families
            </p>
          </div>
        </section>
      )}

      {/* Mobile Pantry Schedule - Clean Layout */}
      {mobilePantry && (
        <section id="schedule" className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-[1200px]">
            {/* Section header */}
            <div className="mb-16 lg:mb-20">
              <p className="text-primary font-semibold text-base mb-4 tracking-wide uppercase">
                Mobile Food Pantry
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {mobilePantry.title}
              </h2>
              {mobilePantry.description && (
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                  {mobilePantry.description}
                </p>
              )}
            </div>

            {/* Simple Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Frequency card */}
              {mobilePantry.frequency && (
                <div className="bg-primary p-8 lg:p-10 rounded-lg text-charcoal">
                  <p className="text-sm uppercase tracking-wider mb-3 font-semibold opacity-80">Schedule</p>
                  <p className="text-3xl lg:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {mobilePantry.frequency}
                  </p>
                </div>
              )}

              {/* Time card */}
              {mobilePantry.time && (
                <div className="bg-white p-8 lg:p-10 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-semibold">Time</p>
                  <p className="text-3xl lg:text-4xl font-bold text-charcoal leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {mobilePantry.time}
                  </p>
                </div>
              )}

              {/* Location card */}
              {mobilePantry.location && (
                <div className="bg-white p-8 lg:p-10 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-semibold">Location</p>
                  <p className="text-lg lg:text-xl font-bold text-charcoal leading-tight mb-4">
                    {mobilePantry.location}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mobilePantry.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors text-base"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}

            </div>

            {/* Upcoming dates */}
            {mobilePantry.dates && mobilePantry.dates.length > 0 && (
              <div className="bg-cream-dark p-8 lg:p-12 rounded-lg">
                <p className="text-sm uppercase tracking-wider text-gray-600 mb-6 font-semibold">Upcoming Dates</p>

                {/* Next date highlighted */}
                {mobilePantry.dates[0] && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-2">Next Event</p>
                    <p className="text-3xl lg:text-4xl font-bold text-charcoal mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {new Date(mobilePantry.dates[0]).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 text-gray-700">
                      {mobilePantry.time && (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {mobilePantry.time}
                        </span>
                      )}
                      {mobilePantry.location && (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {mobilePantry.location}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Remaining dates */}
                {mobilePantry.dates.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {mobilePantry.dates.slice(1, 6).map((date: string, index: number) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg text-center border border-gray-200"
                      >
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                        <p className="text-2xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                          {new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Updates */}
      {announcements && announcements.length > 0 && (
        <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-cream">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-16 lg:mb-20">
              <p className="text-secondary font-semibold text-base mb-4 tracking-wide uppercase">
                Stay Updated
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Latest News
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {announcements.map((announcement, index) => (
                <article
                  key={announcement._id}
                  className={`bg-white p-8 lg:p-10 rounded-lg shadow-sm ${
                    index === 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className={`${index === 0 ? 'lg:grid lg:grid-cols-2 lg:gap-10' : ''}`}>
                    {announcement.image && (
                      <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-6 lg:mb-0">
                        <Image
                          src={urlFor(announcement.image).width(800).height(600).url()}
                          alt={announcement.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <time className="text-sm text-gray-600 font-medium mb-4 block">
                        {new Date(announcement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>

                      <h3
                        className={`mb-4 ${
                          index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                        } font-bold text-charcoal leading-tight`}
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {announcement.title}
                      </h3>

                      {announcement.content && (
                        <div className="prose max-w-none">
                          <PortableText value={announcement.content} />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 lg:mb-20 text-center">
            <p className="text-primary font-semibold text-base mb-4 tracking-wide uppercase">
              Serving Eudora
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              How We Help
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Located in the heart of Eudora, we're here to support our neighbors with compassion,
              dignity, and essential resources every Wednesday.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
            {/* Services Card */}
            <div className="bg-cream-dark p-8 lg:p-10 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Services We Offer
                </h3>
              </div>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Curbside Pickup</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Inside Shopping</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Home Delivery (as needed)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Emergency Food Assistance</span>
                </li>
              </ul>
            </div>

            {/* What You Receive Card */}
            <div className="bg-cream-dark p-8 lg:p-10 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  What You Receive
                </h3>
              </div>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Non-perishable Food Items</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fresh Meat</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Milk & Eggs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fresh Bread</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="bg-charcoal text-white p-10 lg:p-14 rounded-lg mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <svg className="w-9 h-9 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Serving the Eudora Community
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                We're proud to serve our neighbors right here in Eudora, Kansas. Whether you're facing a temporary
                setback or ongoing challenges, we're here for you with no judgment—only support.
              </p>
              <div className="inline-flex items-center gap-3 bg-primary/20 px-6 py-3 rounded-full">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-semibold">Open Every Wednesday • 9am - 12pm</span>
              </div>
            </div>
          </div>

          {/* Donation Information */}
          <div className="bg-primary p-10 lg:p-14 rounded-lg text-charcoal">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                We Depend 100% on Donations
              </h3>
              <p className="text-xl leading-relaxed max-w-2xl mx-auto">
                Every contribution makes a direct impact. Here's how you can help support our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Drop Off */}
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-charcoal rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Drop Off Donations
                </h4>
                <p className="text-base leading-relaxed mb-3">
                  Bring food, checks, or cash on Wednesdays at 738 Church Street, Eudora
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=738+Church+Street+Eudora+KS+66025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-charcoal font-bold hover:text-gray-800 transition-colors text-sm"
                >
                  Get Directions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Food Bins */}
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-charcoal rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Use Food Bins
                </h4>
                <p className="text-base leading-relaxed">
                  Find donation bins at Eudora Community Library and Main Street Scoops & Sweets
                </p>
              </div>

              {/* Mail Check */}
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg">
                <div className="w-12 h-12 bg-charcoal rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Mail a Check
                </h4>
                <p className="text-base leading-relaxed font-medium">
                  P.O. Box 722<br />
                  Eudora, Kansas 66025
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="#donate"
                className="inline-flex items-center justify-center gap-2 bg-charcoal text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Donate Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Take Action Section */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-cream">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Ready to take action?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              There are lots of great ways to help us serve families in need.
              <br />
              <strong>Take action today, and make a difference.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Volunteer Card */}
            <div className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-900">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop"
                  alt="Volunteers helping at food pantry"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Volunteer with us
                </h3>
                <p className="text-white/90 mb-6 text-base">
                  Join our team of dedicated volunteers helping families every Wednesday.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-primary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all self-start"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Host a Food Drive Card */}
            <div className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-900">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=1000&fit=crop"
                  alt="Community members donating food"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Host a food drive
                </h3>
                <p className="text-white/90 mb-6 text-base">
                  Organize a food drive at your workplace, school, or community group.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-primary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all self-start"
                >
                  Learn How
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Become a Monthly Supporter Card */}
            <div className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-900">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=1000&fit=crop"
                  alt="Hands holding heart"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Monthly supporter
                </h3>
                <p className="text-white/90 mb-6 text-base">
                  A monthly gift helps us plan ahead and serve more families consistently.
                </p>
                {homepage.donationLink && (
                  <a
                    href={homepage.donationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all self-start"
                  >
                    Join Today
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="relative py-20 sm:py-32 lg:py-40 px-6 lg:px-8 bg-charcoal text-white overflow-hidden">
        {/* Simplified background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gray-900"></div>

        <div className="mx-auto max-w-[1400px] relative z-10">
          {/* Header */}
          <div className="mb-20 lg:mb-28">
            <p className="text-primary font-bold text-sm mb-6 tracking-[0.3em] uppercase">
              Get In Touch
            </p>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Visit Us
            </h2>
            <p className="text-2xl sm:text-3xl text-gray-400 font-light leading-relaxed max-w-3xl">
              738 Church Street, Eudora, Kansas
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
            {/* Left Column - Hours & Location */}
            <div className="space-y-12">
              {/* Hours */}
              <div className="border-l-4 border-primary pl-8">
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-bold">
                  Open Hours
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Wednesdays
                </p>
                <p className="text-2xl sm:text-3xl text-gray-300 font-light">
                  9:00 AM to 12:00 PM
                </p>
              </div>

              {/* Location */}
              <div className="border-l-4 border-secondary pl-8">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary mb-4 font-bold">
                  Location
                </p>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  738 Church Street<br />
                  Eudora, Kansas 66025
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=738+Church+Street+Eudora+KS+66025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-primary hover:text-primary-dark font-bold text-lg transition-colors"
                >
                  Get Directions
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Contact Methods */}
            <div className="space-y-12">
              <div className="border-l-4 border-accent pl-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4 font-bold">
                  Contact
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Email</p>
                    <a
                      href="mailto:eudorafoodpantry722@gmail.com"
                      className="text-xl text-white hover:text-primary transition-colors font-medium"
                    >
                      eudorafoodpantry722@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Phone</p>
                    <a
                      href="tel:7854237644"
                      className="text-xl text-white hover:text-primary transition-colors font-medium"
                    >
                      (785) 423-7644
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Facebook</p>
                    <a
                      href="https://www.facebook.com/EudoraFoodPantry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xl text-white hover:text-primary transition-colors font-medium"
                    >
                      Message Us
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-12 lg:p-16 rounded-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal mb-6 leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Need Help? We're Here For You
              </h3>
              <p className="text-xl text-charcoal/80 mb-10 leading-relaxed">
                Curbside Pickup • Inside Shopping • Home Delivery • Emergency Assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="tel:7854237644"
                  className="group inline-flex items-center justify-center gap-3 bg-charcoal hover:bg-gray-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us Now
                </a>
                <a
                  href="mailto:eudorafoodpantry722@gmail.com"
                  className="group inline-flex items-center justify-center gap-3 bg-charcoal/20 hover:bg-charcoal/30 backdrop-blur-sm text-charcoal border-2 border-charcoal/40 hover:border-charcoal px-10 py-5 rounded-full font-bold text-lg transition-all"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Simple Grid */}
      {homepage.gallery && homepage.gallery.length > 0 && (
        <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-16 lg:mb-20">
              <p className="text-accent font-semibold text-base mb-4 tracking-wide uppercase">
                Gallery
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Our Community
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {homepage.gallery.map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg aspect-square"
                >
                  <Image
                    src={urlFor(image).width(800).height(800).url()}
                    alt={`Gallery image ${index + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer - Clean & Simple */}
      <footer className="bg-charcoal text-white py-16 lg:py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {homepage.pantryName}
              </h3>
              <p className="text-lg text-gray-400 mb-6 max-w-md">
                Serving our community with compassion and dignity.
              </p>

              {/* Quick links */}
              <div className="flex gap-6">
                <a href="#schedule" className="text-gray-400 hover:text-primary transition-colors">
                  Schedule
                </a>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  About
                </a>
                <a href="#donate" className="text-gray-400 hover:text-primary transition-colors">
                  Donate
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center md:items-end">
              {homepage.donationLink && (
                <a
                  href={homepage.donationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-charcoal px-8 py-4 font-semibold transition-all duration-300 rounded-lg"
                >
                  Support Our Mission
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {homepage.pantryName}. All rights reserved.
            </p>
            <p className="text-sm text-gray-600">
              Built with care for the community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
