import { BarChart3, BookOpen, FileSignature, Home, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/flag.svg";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Stories", href: "/stories", icon: BookOpen },
  { name: "Stats", href: "/stats", icon: BarChart3 },
  { name: "Petitions", href: "/petitions", icon: FileSignature },
  { name: "Contact", href: "/contact-us", icon: Mail },
];

export default function Navbar() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const activeIndex = navItems.findIndex((item) => item.href === pathname);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", updatePathname);
    window.addEventListener("app:navigate", updatePathname);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener("app:navigate", updatePathname);
    };
  }, []);

  const navigate = (event, href) => {
    event.preventDefault();

    if (window.location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", href);
    window.dispatchEvent(new Event("app:navigate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 px-5 pt-4">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/12 bg-gray-950/55 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <a
            href="/"
            onClick={(event) => navigate(event, "/")}
            className="group flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-lg shadow-white/10 transition group-hover:border-red-300/50">
              <img src={logo} alt="Iran Info" className="h-[145%] w-[145%] max-w-none object-cover" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Iran Info
            </span>
          </a>

          <div className="relative grid w-[540px] grid-cols-5 text-sm">
            <span
              className="pointer-events-none absolute bottom-[-12px] h-0.5 w-14 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.78)] transition-all duration-500 ease-out"
              style={{
                left: `calc(${currentIndex * 20}% + 10%)`,
                transform: "translateX(-50%)",
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentIndex === index;

              return (
              <a
                key={`${item.name}-${item.href}`}
                href={item.href}
                onClick={(event) => navigate(event, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center justify-center gap-2 rounded-full px-3 py-2 transition duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                {item.name}
              </a>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="fixed left-3 right-3 top-0 z-50 pt-3 md:hidden">
        <nav className="mx-auto flex max-w-md items-center justify-center rounded-full border border-white/12 bg-gray-950/60 px-4 py-3 shadow-xl shadow-black/25 backdrop-blur-xl">
          <a
            href="/"
            onClick={(event) => navigate(event, "/")}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-lg shadow-white/10">
              <img src={logo} alt="Iran Info" className="h-[145%] w-[145%] max-w-none object-cover" />
            </span>
            <span className="text-sm font-semibold tracking-wide">Iran Info</span>
          </a>
        </nav>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-50 md:hidden">
        <nav className="mx-auto max-w-md rounded-2xl border border-white/12 bg-gray-950/70 px-2 py-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="relative grid grid-cols-5 gap-1">
            <span
              className="pointer-events-none absolute -bottom-2 h-0.5 w-[calc(20%-0.5rem)] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)] transition-all duration-500 ease-out"
              style={{
                left: `calc(${currentIndex * 20}% + 0.25rem)`,
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentIndex === index;

              return (
                <a
                key={`${item.name}-${item.href}`}
                href={item.href}
                onClick={(event) => navigate(event, item.href)}
                aria-current={isActive ? "page" : undefined}
                  className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
                  <span className="w-full truncate text-center">{item.name}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
