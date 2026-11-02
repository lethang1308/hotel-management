import React from "react";
import { Headset } from "lucide-react";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

export function AuthTopBar({ right }) {
  const { isVi } = useLanguage();

  return (
    <div className="flex items-center justify-end gap-4 px-6 pt-5 md:px-10">
      <LanguageSelector />
      {right ?? (
        <>
          <a
            href="mailto:support@staynest.com"
            className="text-[13px] font-medium text-ink/80 transition-colors hover:text-primary"
          >
            {isVi ? "Trợ giúp?" : "Need help?"}
          </a>
          <a
            href="mailto:support@staynest.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[13px] font-medium text-ink transition-all duration-200 hover:-translate-y-[1px] hover:border-primary/40 hover:text-primary"
          >
            <Headset className="h-4 w-4" aria-hidden />
            {isVi ? "Liên hệ" : "Contact us"}
          </a>
        </>
      )}
    </div>
  );
}

export default AuthTopBar;
