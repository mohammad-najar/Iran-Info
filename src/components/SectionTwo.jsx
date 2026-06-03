import { useEffect, useState } from "react";
import InternetShutdownChart from "./InternetShutdownChart";

const blackoutWords = [
  "The World",
  "The Internet",
  "Their Loved Ones",
  "The Truth",
  "Their Dreams",
  "The Right to Be Heard",
  "Their Future",
  "Freedom",
  "Hope",
  "Justice",
  "Safety",
  "Dignity",
];

export default function SectionTwo() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = blackoutWords[wordIndex];
    const isComplete = text === word;
    const isEmpty = text === "";
    let delay = isDeleting ? 42 : 82;

    if (!isDeleting && isComplete) {
      delay = 1300;
    } else if (isDeleting && isEmpty) {
      delay = 300;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % blackoutWords.length);
        return;
      }

      setText((currentText) =>
        isDeleting
          ? currentText.slice(0, -1)
          : word.slice(0, currentText.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, text, wordIndex]);

  return (
    <section
      id="stories"
      className="relative scroll-mt-24 bg-transparent px-5 pb-16 pt-16 text-white sm:px-6 md:pb-20 md:pt-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300/80">
          Digital Blackout
        </p>

        <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          A Nation Disconnected From
          <span className="mt-1 block min-h-[1.6em] text-white sm:min-h-[1.3em]">
            {text}
            <span
              className="ml-1 inline-block h-[0.9em] w-px animate-pulse bg-red-300 align-baseline"
              aria-hidden="true"
            />
          </span>
        </h2>

        <div className="mt-3 w-full space-y-5 text-justify text-base leading-8 text-white/65 sm:mt-6 sm:text-lg">
          <p>
            For years, the Iranian government has repeatedly imposed internet
            shutdowns and severe digital restrictions during periods of unrest
            and public demonstrations. Each blackout has cut millions of people
            off from the outside world, disrupting communication, limiting
            access to information, damaging livelihoods, and silencing the
            voices of ordinary citizens. Small businesses that depend on online
            platforms have lost customers overnight, families have been unable
            to contact loved ones, and people facing danger have been left
            without a way to share their stories with the world.
          </p>

          <InternetShutdownChart />

          <p>
            The most recent nationwide internet shutdown became the longest and
            most severe digital blackout in the history, lasting 88 days. Its
            consequences reached far beyond technology. Workers lost income,
            businesses were pushed to the brink of collapse, students lost
            access to educational resources, and families were isolated during
            a time of uncertainty and fear. Our mission is to document these
            experiences, amplify the voices of those affected, and help people
            outside Iran understand the human cost of digital repression. Every
            story shared here represents a person whose voice deserves to be
            heard.
          </p>
        </div>
      </div>
    </section>
  );
}
