import React from "react";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageSelector({ className = "" }) {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        aria-label="Select language"
        className={`group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-sm font-medium text-ink/85 backdrop-blur transition-all duration-200 hover:border-primary/40 hover:bg-background hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
      >
        <Globe className="h-4 w-4 text-primary transition-transform duration-300 group-hover:rotate-12" aria-hidden />
        <span className="font-semibold uppercase tracking-wider text-xs">
          {language === "vi" ? "VI" : "EN"}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-44 rounded-2xl border-border/70 bg-background/95 p-1.5 shadow-[0_20px_50px_-20px_rgba(26,46,32,0.3)] backdrop-blur"
      >
        <DropdownMenuItem
          onClick={() => setLanguage("vi")}
          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-[13.5px] transition-colors focus:bg-primary/[0.06] ${
            language === "vi" ? "font-semibold text-primary" : "text-ink"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🇻🇳</span>
            <span>Tiếng Việt</span>
          </span>
          {language === "vi" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-[13.5px] transition-colors focus:bg-primary/[0.06] ${
            language === "en" ? "font-semibold text-primary" : "text-ink"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🇬🇧</span>
            <span>English</span>
          </span>
          {language === "en" && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
