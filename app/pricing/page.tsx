import { Nav, Footer, PricingCards } from "@/components/marketing";

export const metadata = { title: "Pricing – MeetWiseAI" };

export default function Pricing() {
  return (
    <>
      <div className="bg-hero pb-24 pt-4">
        <Nav />
        <div className="mx-auto mt-20 max-w-3xl px-6 text-center">
          <h1 className="font-display text-5xl md:text-7xl">Simple pricing. Real results.</h1>
          <p className="mt-6 text-lg text-ink/70">Start free. Upgrade when you need more.</p>
        </div>
      </div>
      <section className="-mt-10 px-6 pb-24">
        <PricingCards />
      </section>
      <Footer />
    </>
  );
}
