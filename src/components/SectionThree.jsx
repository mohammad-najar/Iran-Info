import BusinessFailureDevices from "./BusinessFailureDevices";

function CrackedWord() {
  return (
    <span className="crack-word" aria-label="Disconnection">
      <span className="crack-word-placeholder" aria-hidden="true">
        Disconnection
      </span>
      <span className="crack-layer crack-layer-left" aria-hidden="true">
        Disconnection
      </span>
      <span className="crack-layer crack-layer-middle" aria-hidden="true">
        Disconnection
      </span>
      <span className="crack-layer crack-layer-right" aria-hidden="true">
        Disconnection
      </span>
      <span className="crack-line" aria-hidden="true" />
    </span>
  );
}

export default function SectionThree() {
  return (
    <section
      id="timeline"
      className="scroll-mt-24 bg-transparent px-5 pb-14 pt-0 text-white sm:px-6 md:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-300/80">
          Economic Impact
        </p>

        <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          The Cost of <CrackedWord />
        </h2>

        <div className="mt-6 w-full space-y-5 text-justify text-base leading-8 text-white/65 sm:text-lg">
          <p>
            For thousands of Iranian entrepreneurs, the internet is not a
            luxury, it is their workplace. In recent years, many small
            businesses have been built on digital platforms such as Instagram,
            messaging applications, and online marketplaces. These businesses
            provide income for families, create jobs, and offer opportunities in
            an economy already facing significant challenges.
          </p>

          <BusinessFailureDevices />

          <p>
            When the internet is shut down, these businesses are effectively
            forced to close overnight. Orders cannot be processed, customers
            cannot be reached, payments are disrupted, and advertising comes to
            a halt. During extended periods of digital blackout, many business
            owners lose months of income. Some are forced to lay off employees,
            while others permanently shut down operations after losing their
            customer base. Behind every disconnected account is a family
            struggling to pay rent, buy essentials, and secure their future. The
            economic cost of internet shutdowns is measured not only in lost
            revenue, but also in lost opportunities, damaged livelihoods, and
            shattered dreams.
          </p>
        </div>
      </div>
    </section>
  );
}
