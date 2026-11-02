import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-mark.png";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { UserMenu } from "./UserMenu";
import { LanguageSelector } from "@/components/common/LanguageSelector";

export function Nav() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.stays"), to: "/search" },
    { label: t("nav.destinations"), to: "/search" },
    { label: t("nav.offers"), to: "/search?sort=price_asc" },
    { label: t("nav.concierge"), to: "/#concierge" },
    { label: t("nav.saved"), to: "/wishlist" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,250,246,0.88) 0%, rgba(253,250,246,0.52) 55%, rgba(253,250,246,0) 100%)",
        }}
      />
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="StayNest home">
          <img src={logoMark} alt="" className="h-9 w-9" />
          <span className="font-display text-2xl leading-none text-primary">
            StayNest
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[15px] font-medium text-ink/85 transition-colors duration-200 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Language Switcher (EN / VI) */}
          <LanguageSelector />

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-medium text-ink/85 transition-colors hover:text-primary md:inline-flex"
              >
                {t("nav.signIn")}
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-mid"
              >
                {t("nav.signUp")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
