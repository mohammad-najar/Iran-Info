import BlackoutWorldMap from "./BlackoutWorldMap";

export default function SectionFour() {
  return (
    <section
      id="evidence"
      className="scroll-mt-24 bg-transparent px-5 pb-14 pt-0 text-white sm:px-6 md:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300/80">
          Life During Blackout
        </p>

        <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          When a Country Goes <span className="offline-word">Offline</span>
        </h2>

        <div className="mt-6 w-full space-y-5 text-justify text-base leading-8 text-white/65 sm:text-lg">
          <p>
            For most people, losing internet access is a temporary inconvenience.
            For millions of Iranians, it has become a recurring reality. During
            nationwide internet shutdowns, people are suddenly cut off from
            essential services, communication platforms, educational resources,
            and independent sources of information. Families struggle to contact
            loved ones, students lose access to learning tools, workers are unable
            to perform their jobs, and citizens are left isolated from the outside
            world.
          </p>

          <BlackoutWorldMap />

          <p>
            A nationwide digital blackout affects far more than social media. It
            disrupts daily life, weakens emergency communication, limits access to
            news, and prevents people from sharing what is happening around them.
            For those living through it, the feeling is one of uncertainty and
            isolation. The world can no longer see them, hear them, or easily
            understand what they are experiencing. This is why documenting these
            shutdowns matters. Behind every blackout are millions of people whose
            voices deserve to reach beyond the digital walls built around them.
          </p>
        </div>
      </div>
    </section>
  );
}
