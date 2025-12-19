import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

const services = [
  {
    title: "Book Publishing",
    desc: "Upload, review, ISBN, and publish with end-to-end editorial support.",
  },
  {
    title: "Research Consultant",
    desc: "Quality research assistance from methodology to publication readiness.",
  },
  {
    title: "OJS Management",
    desc: "Digital journal system setup and operations with transparent workflows.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-orange-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="#hero" className="text-xl font-semibold text-orange-600">
            Cognifera
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-orange-600">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/login"
            className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* Hero */}
        <section id="hero" className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-semibold uppercase text-orange-600">PT Cognifera Education Academy · Est. 2024</p>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Cognifera Publishing</h1>
            <p className="text-lg text-gray-600 md:text-xl">
              Digital manuscript publishing system—upload your work, monitor the process, and publish with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition"
              >
                Start Publishing
              </Link>
              <Link
                href="#services"
                className="rounded-full border border-orange-200 px-6 py-3 text-sm font-semibold text-orange-700 hover:border-orange-300 hover:text-orange-800 transition"
              >
                View Services
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="rounded-full bg-white px-3 py-1 shadow-sm">Publisher&apos;s Decree · Puspresnas</span>
              <span className="rounded-full bg-white px-3 py-1 shadow-sm">End-to-End ISBN & Layout</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-64 rounded-2xl bg-linear-to-br from-orange-100 via-white to-orange-50 shadow-inner md:h-72" aria-hidden />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-orange-600">Services</p>
              <h2 className="text-2xl font-bold text-gray-900">What we deliver</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="h-full rounded-xl border border-orange-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="rounded-2xl bg-linear-to-br from-orange-200 via-orange-50 to-white p-6 shadow-inner">
              <div className="aspect-video rounded-xl bg-white/70 shadow" aria-hidden />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase text-orange-600">About Cognifera</p>
              <h2 className="text-3xl font-bold text-gray-900">Integrated digital ecosystem for education and research</h2>
              <p className="text-sm text-gray-700">
                Born from the experience of managing OJS and officially established in 2024, PT Cognifera Education Academy is here with a vision to build an integrated digital ecosystem for academics.
              </p>
              <p className="text-sm text-gray-700">
                With official legality from Puspresnas, we combine professional publishing standards with cutting-edge technology. We provide a secure and transparent platform to manage the entire manuscript workflow—from draft to obtaining an ISBN. At Cognifera, we turn research into a lasting literacy footprint.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-orange-100 bg-black py-6 text-center text-sm text-white0 ">
        © 2025 PT Cognifera Education Academy. All Rights Reserved.
      </footer>
    </div>
  );
}