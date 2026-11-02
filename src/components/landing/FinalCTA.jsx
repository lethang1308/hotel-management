import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface/70 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl px-6 text-center md:px-10"
      >
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
          {t("finalCTA.title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {t("finalCTA.desc")}
        </p>
        <div className="mt-10">
          <Link
            to="/search"
            className="inline-flex items-center rounded-2xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-mid"
          >
            {t("finalCTA.btn")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCTA;
