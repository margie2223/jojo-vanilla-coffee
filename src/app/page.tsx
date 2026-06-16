"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Ship,
  Sprout,
  ShieldCheck,
  Globe2,
  Leaf,
  Package,
  Factory,
  FlaskConical,
  Layers,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* --------------------------------------------------------------- */
/* Data                                                            */
/* --------------------------------------------------------------- */

const NAV = [
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Vision & Mission", href: "#about" },
      { label: "Our Company", href: "#about" },
      { label: "Global Social Actions", href: "#sustainability" },
      { label: "Team", href: "#about" },
      { label: "Careers", href: "#about" },
    ],
  },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Vanilla", href: "#products" },
      { label: "Cinnamon & Cassia", href: "#products" },
      { label: "Spices", href: "#products" },
    ],
  },
  {
    label: "Origins",
    href: "#origins",
    children: [
      { label: "Madagascar", href: "#origins" },
      { label: "Indonesia", href: "#origins" },
      { label: "Uganda", href: "#origins" },
    ],
  },
  {
    label: "Accreditations",
    href: "#why",
    children: [
      { label: "Quality", href: "#why" },
      { label: "Sustainability", href: "#sustainability" },
    ],
  },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const ORIGINS = [
  {
    name: "Madagascar",
    image:
      "https://sfile.chatglm.cn/images-ppt/d471513fd42b.jpg",
    description:
      "A leading origin for premium vanilla beans, we also source bulk cloves, cinnamon, and traceable natural spices.",
  },
  {
    name: "Uganda",
    image:
      "https://sfile.chatglm.cn/images-ppt/b9951a0cf83c.png",
    description:
      "Uganda is Africa's second largest origin for vanilla exports, known for bold flavor profiles and reliable sourcing in bulk volumes.",
  },
  {
    name: "Indonesia",
    image:
      "https://sfile.chatglm.cn/images-ppt/59d7d611c852.png",
    description:
      "Indonesia is a key origin for many natural products such as cassia, nutmeg and vanilla.",
  },
];

const WHY_PARTNER = [
  {
    icon: Ship,
    title: "Reliable Logistics & Scalability",
    description:
      "With warehousing hubs in Europe & USA, and a dedicated logistics team, we ensure timely deliveries and scalable volume for global operations.",
  },
  {
    icon: Sprout,
    title: "Traceable & Transparent Sourcing",
    description:
      "We operate directly from origin regions like Madagascar, ensuring full visibility from farmer to factory. No middlemen. No uncertainty.",
  },
  {
    icon: ShieldCheck,
    title: "Globally Certified Quality",
    description:
      "Our ingredients meet international food safety and sustainability standards. Organic, FSSC 22000, Fair Trade, Rainforest Alliance — compliance is non-negotiable.",
  },
];

const PRODUCTS = [
  {
    name: "Vanilla",
    image:
      "https://sfile.chatglm.cn/images-ppt/66e4a873253b.jpg",
    description:
      "Planifolia and Tahitensis varieties from Madagascar, Indonesia and Uganda.",
    tag: "Bourbon & Tahitensis",
  },
  {
    name: "Ceylon & Cassia",
    image:
      "https://sfile.chatglm.cn/images-ppt/bb0873e38481.jpg",
    description:
      "Indonesian, Vietnamese and Sri Lankan, selected for consistent oil content and color.",
    tag: "Cinnamon Bark",
  },
  {
    name: "Spices",
    image:
      "https://sfile.chatglm.cn/images-ppt/487c639d1993.jpg",
    description:
      "Including turmeric, cloves, nutmeg and other raw materials for food, flavor and fragrance applications.",
    tag: "Whole & Ground",
  },
];

const NEWS = [
  {
    title: "Understanding Nutmeg: History, B2B Sourcing and Applications",
    excerpt:
      "From colonial-era trade routes to modern B2B supply chains, nutmeg remains one of the most sought-after spices for food, flavour and fragrance industries. Learn how origin, harvesting and post-harvest handling shape quality.",
    date: "April 2026",
    category: "Spices",
    image: "/images/nutmeg.webp",
  },
  {
    title: "US Tariffs Impact on Vanilla & Natural Products",
    excerpt:
      "Recent shifts in US trade policy have direct implications for vanilla importers and food manufacturers. We break down what the new tariff schedules mean for landed cost, sourcing strategy and contract pricing.",
    date: "March 2026",
    category: "Market Insight",
    image: "/images/container-ship.webp",
  },
  {
    title: "Vanilla Global Market Report – July 2024",
    excerpt:
      "Production outlook from Madagascar, Uganda and Indonesia, price trends across planifolia and tahitensis varieties, and what buyers should plan for in the next 12–18 months.",
    date: "July 2024",
    category: "Market Report",
    image: "/images/vanilla-farm.webp",
  },
];

const WHO_WE_SERVE = [
  {
    icon: Factory,
    title: "Food & Beverage Manufacturers",
    subtitle: "Bulk spices buyers",
    description:
      "Ensure stable flavor profiles and year-round volume for large-scale food production.",
  },
  {
    icon: FlaskConical,
    title: "Fragrances & Flavors Houses",
    subtitle: "Extract specialists & perfumers",
    description:
      "Source high-purity vanilla, clove, and spice oils with origin traceability and certified quality.",
  },
  {
    icon: Layers,
    title: "Private Label Blenders",
    subtitle: "Blenders & Co-packers",
    description:
      "Secure compliant, traceable raw materials for customized product development.",
  },
];

const CERTIFICATIONS = [
  "Organic",
  "FSSC 22000",
  "Fair Trade",
  "Rainforest Alliance",
  "ISO 22000",
  "Kosher",
  "Halal",
  "GMP",
];

/* --------------------------------------------------------------- */
/* Sub-components                                                  */
/* --------------------------------------------------------------- */

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 py-2">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+31103033730"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+31 (10) 3033730</span>
          </a>
          <a
            href="mailto:info@jojovanillacoffee.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>info@jojovanillacoffee.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-primary-foreground/80">
            Rotterdam · Breinigsville · Worldwide
          </span>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/80">EN</span>
            <span className="text-primary-foreground/40">/</span>
            <span className="text-primary-foreground/60">日本語</span>
            <span className="text-primary-foreground/40">/</span>
            <span className="text-primary-foreground/60">한국어</span>
          </div>
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-1 hover:text-accent transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b transition-shadow ${
        scrolled ? "shadow-md border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center shrink-0">
            <img
              src="/images/logo-jojo.jpg"
              alt="JOJO VANILLA & COFFEE (U) LIMITED"
              className="h-20 w-auto rounded-xl shadow-sm border border-border/60 bg-white p-1"
            />
          </a>

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAV.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-quicksand font-semibold text-foreground/90 hover:text-primary text-[15px]">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[260px] gap-1 p-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <NavigationMenuLink
                              asChild
                              className="block rounded-md px-3 py-2 text-sm hover:bg-accent/30 hover:text-primary transition-colors"
                            >
                              <a href={child.href}>{child.label}</a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent font-quicksand font-semibold text-foreground/90 hover:text-primary text-[15px]`}
                    >
                      <a href={item.href}>{item.label}</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-quicksand font-semibold rounded-full px-6"
            >
              <a href="#quote">Request a Quote</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent/30"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-1">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/60 last:border-0">
                <a
                  href={item.href}
                  className="block py-3 font-quicksand font-semibold text-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pb-2 pl-4 space-y-1">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-quicksand font-semibold rounded-full"
            >
              <a href="#quote" onClick={() => setMobileOpen(false)}>
                Request a Quote
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src="/images/homepage1.jpg"
          alt="Vanilla beans drying in the sun at a sustainable farm"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl text-primary-foreground">
          <p className="inline-flex items-center gap-2 text-accent font-quicksand font-semibold uppercase tracking-wider text-sm mb-5 animate-fade-up">
            <span className="h-px w-10 bg-accent" />
            Direct from origin. Built for B2B.
          </p>
          <h1
            className="font-quicksand font-bold leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Natural Products
            <br />
            <span className="text-accent">from Origins</span>
            <br />
            to Market
          </h1>
          <p
            className="mt-7 text-lg md:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            JOJO VANILLA & COFFEE (U) LIMITED is your B2B partner for vanilla, cassia,
            cinnamon and a full range of sustainably sourced spices — sourced
            directly from Madagascar, Indonesia and Uganda.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-semibold rounded-full px-7"
            >
              <a href="#products" className="inline-flex items-center gap-2">
                Explore our Products
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-quicksand font-semibold rounded-full px-7"
            >
              <a href="#quote">Request a Quote</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom credentials strip */}
      <div className="relative bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { icon: Globe2, label: "3 Origin Countries" },
            { icon: ShieldCheck, label: "Globally Certified" },
            { icon: Truck, label: "EU & USA Warehousing" },
            { icon: Leaf, label: "Sustainable Sourcing" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-2 justify-center md:justify-start">
              <c.icon className="h-4 w-4 text-accent" />
              <span className="font-quicksand font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertifiedSupplier() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-primary font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
              <span className="h-px w-10 bg-primary" />
              About JOJO
            </p>
            <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Your Certified Supplier of Natural Ingredients
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                At JOJO VANILLA & COFFEE (U) LIMITED, we specialize in the direct
                sourcing and global distribution of high-quality natural
                ingredients. With local teams in origin countries, we manage
                each step of the supply chain to guarantee product integrity,
                food safety compliance, and optimized availability.
              </p>
              <p>
                Our product portfolio includes vanilla beans, cassia and
                cinnamon, nutmeg, cloves, turmeric and other spices — supplied
                to food &amp; beverage manufacturers, fragrances &amp; flavors
                houses and private label blenders across the globe.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Vanilla", "Cassia & Cinnamon", "Nutmeg", "Cloves", "Turmeric"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground border border-border"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
            <Button
              asChild
              className="mt-9 bg-primary hover:bg-primary/90 text-primary-foreground font-quicksand font-semibold rounded-full px-7"
            >
              <a href="#about" className="inline-flex items-center gap-2">
                About Our Company
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/vanilla-farm.webp"
                alt="Vanilla plantation workers tending to orchid vines"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-card rounded-xl shadow-xl p-5 border border-border max-w-[230px]">
              <p className="font-quicksand font-bold text-3xl text-primary">
                100%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Traceable supply chain — from farmer to container
              </p>
            </div>
            <div className="absolute -top-5 -right-5 hidden md:flex items-center justify-center bg-accent text-accent-foreground rounded-full w-24 h-24 shadow-lg">
              <div className="text-center">
                <p className="font-quicksand font-bold text-xl">B2B</p>
                <p className="text-[10px] uppercase tracking-wider">Sourcing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcingOrigins() {
  return (
    <section id="origins" className="py-20 md:py-28 bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="inline-flex items-center gap-2 text-primary font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="h-px w-10 bg-primary" />
            Sourcing Origins
          </p>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
            Direct relationships with producers, on the ground
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            Our sourcing model is built on direct relationships with producers
            in origin countries, ensuring quality, consistency, and
            traceability. From East Africa to South East Asia, our teams work on
            the ground to monitor harvests, control quality, and support
            responsible sourcing.
          </p>
          <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
            This local footprint allows us to meet international compliance
            standards while maintaining full visibility from farmer to
            container.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ORIGINS.map((o) => (
            <a
              key={o.name}
              href="#origins"
              className="group relative overflow-hidden rounded-2xl shadow-md bg-card border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={o.image}
                  alt={`${o.name} sourcing region`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="font-quicksand font-bold text-2xl mb-2">
                  {o.name}
                </h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  {o.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-accent font-quicksand font-semibold text-sm">
                  Discover sourcing
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  return (
    <section id="why" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <p className="inline-flex items-center gap-2 text-primary font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="h-px w-10 bg-primary" />
            Why partner with us
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
            Why B2B buyers partner with us
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            Three reasons procurement teams, R&amp;D departments, and sourcing
            professionals rely on JOJO VANILLA & COFFEE (U) LIMITED for vanilla and
            spices at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {WHY_PARTNER.map((w) => (
            <div
              key={w.title}
              className="group relative bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <w.icon className="h-7 w-7" />
              </div>
              <h3 className="font-quicksand font-bold text-xl text-foreground mb-3">
                {w.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {w.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="mt-16 bg-secondary/60 rounded-2xl border border-border p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-quicksand font-bold text-xl md:text-2xl text-foreground">
                Compliance is non-negotiable.
              </h3>
              <p className="text-muted-foreground mt-1">
                Our ingredients meet international food safety and
                sustainability standards.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurProducts() {
  return (
    <section
      id="products"
      className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative leaf pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <Leaf className="absolute -top-10 -right-10 h-96 w-96" />
        <Leaf className="absolute -bottom-20 -left-10 h-72 w-72 rotate-180" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="inline-flex items-center gap-2 text-accent font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="h-px w-10 bg-accent" />
            Our Products
          </p>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-primary-foreground leading-tight">
            From vanilla and cassia to nutmeg and cloves
          </h2>
          <p className="mt-5 text-primary-foreground/85 text-base md:text-lg leading-relaxed">
            Discover our full range of sustainably sourced natural ingredients
            — supplied in bulk volumes, with origin traceability and full
            documentation for B2B buyers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p) => (
            <a
              key={p.name}
              href="#products"
              className="group relative overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-quicksand font-semibold">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-quicksand font-bold text-2xl text-foreground mb-2 flex items-center justify-between">
                  {p.name}
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {p.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-semibold rounded-full px-7"
          >
            <a href="#products" className="inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="inline-flex items-center gap-2 text-primary font-quicksand font-semibold uppercase tracking-wider text-sm mb-3">
              <span className="h-px w-10 bg-primary" />
              News &amp; Insights
            </p>
            <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Latest from JOJO
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-quicksand font-semibold rounded-full px-6 self-start"
          >
            <a href="#news" className="inline-flex items-center gap-2">
              All News
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {NEWS.map((n) => (
            <article
              key={n.title}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-quicksand font-semibold">
                  {n.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-quicksand font-semibold mb-2">
                  {n.date}
                </p>
                <h3 className="font-quicksand font-bold text-lg text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {n.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 flex-1">
                  {n.excerpt}
                </p>
                <a
                  href="#news"
                  className="inline-flex items-center gap-1.5 mt-4 text-primary font-quicksand font-semibold text-sm hover:gap-2.5 transition-all"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section
      id="sustainability"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/images/container-ship.webp"
          alt="Container ship carrying responsibly sourced natural products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-primary-foreground">
          <p className="inline-flex items-center gap-2 text-accent font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="h-px w-10 bg-accent" />
            Sustainability
          </p>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Embedded in every part of our global sourcing strategy
          </h2>
          <p className="mt-6 text-primary-foreground/90 text-base md:text-lg leading-relaxed">
            At JOJO VANILLA & COFFEE (U) LIMITED, sustainability is embedded in every
            part of our global sourcing strategy. We work directly with farming
            communities in origin countries to ensure a fair, traceable, and
            ethically responsible supply chain for all our products — including
            vanilla, cassia, cloves, and other spices.
          </p>
          <p className="mt-3 text-primary-foreground/90 text-base md:text-lg leading-relaxed">
            Our teams on the ground support farmer training, post-harvest
            handling, and long-term partnerships that protect both product
            integrity and the livelihoods of the communities we source from.
          </p>
          <div className="mt-9 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "3", label: "Origin countries" },
              { value: "100%", label: "Traceable supply" },
              { value: "EU+US", label: "Warehousing hubs" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-quicksand font-bold text-3xl md:text-4xl text-accent">
                  {s.value}
                </p>
                <p className="text-sm text-primary-foreground/85 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <Button
            asChild
            size="lg"
            className="mt-9 bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-semibold rounded-full px-7"
          >
            <a href="#sustainability" className="inline-flex items-center gap-2">
              Read our Sustainability Commitment
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <p className="inline-flex items-center gap-2 text-primary font-quicksand font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="h-px w-10 bg-primary" />
            Who We Serve
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="font-quicksand font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
            B2B-ready solutions across industries
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            We support procurement teams, R&amp;D departments, and sourcing
            professionals across industries where ingredient quality,
            traceability, and consistency are non-negotiable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {WHO_WE_SERVE.map((w) => (
            <div
              key={w.title}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 text-accent-foreground mb-5">
                <w.icon className="h-7 w-7" />
              </div>
              <p className="text-xs uppercase tracking-wider text-primary font-quicksand font-semibold mb-1">
                {w.subtitle}
              </p>
              <h3 className="font-quicksand font-bold text-xl text-foreground mb-3">
                {w.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {w.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Whether you&apos;re searching for a vanilla supplier or a bulk spices
          exporter, we deliver B2B-ready solutions backed by quality, scale,
          and sourcing expertise.
        </p>
      </div>
    </section>
  );
}

function QuoteCTA() {
  return (
    <section
      id="quote"
      className="py-20 md:py-24 bg-secondary/60 border-y border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Explore Products */}
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm flex flex-col">
            <Package className="h-10 w-10 text-primary mb-5" />
            <h2 className="font-quicksand font-bold text-2xl md:text-3xl text-foreground mb-3">
              Explore our Products
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed flex-1">
              From vanilla and cassia to nutmeg and cloves, discover our full
              range of sustainably sourced natural ingredients.
            </p>
            <Button
              asChild
              className="mt-6 self-start bg-primary hover:bg-primary/90 text-primary-foreground font-quicksand font-semibold rounded-full px-7"
            >
              <a href="#products" className="inline-flex items-center gap-2">
                View Products
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Request a Quote */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 shadow-md flex flex-col relative overflow-hidden">
            <Package className="absolute -bottom-6 -right-6 h-44 w-44 text-primary-foreground/10" />
            <h2 className="font-quicksand font-bold text-2xl md:text-3xl text-primary-foreground mb-3 relative">
              Request a Quote
            </h2>
            <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed flex-1 relative">
              Whether you need bulk volumes or specific origins, we are ready to
              help you find the right product at the right price.
            </p>
            <Button
              asChild
              className="mt-6 self-start bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-semibold rounded-full px-7 relative"
            >
              <a href="#contact" className="inline-flex items-center gap-2">
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Certifications banner */}
      <div className="border-b border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <img
            src="/images/certifications.webp"
            alt="Our certifications: Organic, FSSC 22000, Fair Trade, Rainforest Alliance, and more"
            className="w-full max-w-4xl mx-auto h-auto opacity-95"
          />
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact column */}
          <div>
            <h2 className="footer-heading font-quicksand font-bold text-lg mb-5 text-accent">
              Contact
            </h2>
            <div className="space-y-5 text-sm">
              <div>
                <p className="font-quicksand font-semibold text-primary-foreground mb-1">
                  JOJO VANILLA &amp; COFFEE (U) LIMITED
                </p>
                <p className="text-accent text-xs uppercase tracking-wider font-quicksand font-semibold mb-1">Rotterdam Office</p>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Coventrystraat 7
                  <br />
                  3047 AD Rotterdam
                  <br />
                  The Netherlands
                </p>
              </div>
              <div>
                <p className="font-quicksand font-semibold text-primary-foreground mb-1">
                  JOJO VANILLA &amp; COFFEE (U) LIMITED
                </p>
                <p className="text-accent text-xs uppercase tracking-wider font-quicksand font-semibold mb-1">US Office</p>
                <p className="text-primary-foreground/80 leading-relaxed">
                  1063 Mosser Road, C-205
                  <br />
                  Breinigsville, PA 18031
                  <br />
                  United States of America
                </p>
              </div>
              <ul className="space-y-2 pt-1">
                <li>
                  <a
                    href="tel:+31103033730"
                    className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    +31 (10) 3033730
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12158061124"
                    className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    +1 215 806 1124
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@jojovanillacoffee.com"
                    className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    info@jojovanillacoffee.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/27063273"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-accent" />
                    LinkedIn Page
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sitemap column */}
          <div>
            <h2 className="footer-heading font-quicksand font-bold text-lg mb-5 text-accent">
              Sitemap
            </h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", href: "#about" },
                { label: "Vision & Mission", href: "#about" },
                { label: "Our Company", href: "#about" },
                { label: "Global Social Actions", href: "#sustainability" },
                { label: "Team", href: "#about" },
                { label: "Careers", href: "#about" },
                { label: "News", href: "#news" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h2 className="footer-heading font-quicksand font-bold text-lg mb-5 text-accent">
              Our Products
            </h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Vanilla", href: "#products" },
                { label: "Cinnamon & Cassia", href: "#products" },
                { label: "Spices", href: "#products" },
                { label: "Cloves", href: "#products" },
                { label: "Nutmeg", href: "#products" },
                { label: "Turmeric", href: "#products" },
                { label: "Origins", href: "#origins" },
                { label: "Quality", href: "#why" },
                { label: "Sustainability", href: "#sustainability" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-primary-foreground/85 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch column */}
          <div>
            <h2 className="footer-heading font-quicksand font-bold text-lg mb-5 text-accent">
              Get in touch
            </h2>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-5">
              Looking for a reliable B2B supplier of vanilla, cassia or spices?
              Our team is ready to help you find the right product at the right
              price.
            </p>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-quicksand font-semibold rounded-full px-6"
            >
              <a href="#quote">Request a Quote</a>
            </Button>

            <div className="mt-8 space-y-2 text-sm text-primary-foreground/80">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                Rotterdam · Breinigsville
              </p>
              <p className="flex items-start gap-2">
                <Globe2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                Serving 30+ countries worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>
            © {new Date().getFullYear()} JOJO VANILLA &amp; COFFEE (U) LIMITED, All Rights
            Reserved
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="hover:text-accent transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- */
/* Page                                                            */
/* --------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <CertifiedSupplier />
        <SourcingOrigins />
        <WhyPartner />
        <OurProducts />
        <News />
        <Sustainability />
        <WhoWeServe />
        <QuoteCTA />
      </main>
      <Footer />
    </div>
  );
}
