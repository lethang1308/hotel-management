import { BadgeCheck, Headphones, Leaf, Tag } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function FeatureStrip() {
  const { t } = useLanguage();

  const items = [
    {
      icon: BadgeCheck,
      title: t("features.curatedTitle"),
      desc: t("features.curatedDesc"),
    },
    {
      icon: Leaf,
      title: t("features.trustedTitle"),
      desc: t("features.trustedDesc"),
    },
    {
      icon: Headphones,
      title: t("features.conciergeTitle"),
      desc: t("features.conciergeDesc"),
    },
    {
      icon: Tag,
      title: t("features.priceTitle"),
      desc: t("features.priceDesc"),
    },
  ];

  return (
    <section aria-label="Why StayNest" className="bg-surface/60 py-14">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-10 gap-y-8 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.4} aria-hidden />
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-ink">{title}</div>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureStrip;
