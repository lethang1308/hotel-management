import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  User,
  Heart,
  Users,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

function initialsOf(session) {
  const source = session?.name?.trim() || session?.email?.trim() || "";
  if (!source) return "SN";
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[1][0] : "";
  return (first + second).toUpperCase() || source[0].toUpperCase();
}

export function UserMenu() {
  const { session, signOut } = useAuth();
  const { t } = useLanguage();
  const isManager =
    !!session?.roles?.includes("HOTEL_MANAGER") ||
    !!session?.roles?.includes("ADMIN");
  const navigate = useNavigate();
  const label = session?.name || session?.email?.split("@")[0] || t("nav.account");
  const initials = initialsOf(session);

  const handleSignOut = () => {
    signOut();
    toast.success(t("nav.signOut"));
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="group inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/60 pl-1 pr-3.5 py-1 backdrop-blur transition-all duration-200 hover:border-primary/40 hover:bg-background hover:shadow-[0_2px_10px_rgba(26,46,32,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Avatar className="h-8 w-8 border border-primary/10">
          <AvatarFallback className="bg-primary text-[12px] font-semibold tracking-wide text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-[120px] truncate text-[13.5px] font-medium text-ink/85 transition-colors group-hover:text-primary sm:inline">
          {label}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border-border/70 bg-background/95 p-1.5 shadow-[0_20px_60px_-20px_rgba(26,46,32,0.35)] backdrop-blur"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <div className="font-display text-[15px] font-medium leading-tight text-primary">
            {session?.name || t("nav.welcomeBack")}
          </div>
          {session?.email && (
            <div className="mt-0.5 truncate text-[12px] font-normal text-muted-foreground">
              {session.email}
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border/70" />

        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/dashboard">
            <LayoutDashboard className="mr-2.5 h-4 w-4" />
            {t("nav.dashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/bookings">
            <CalendarCheck className="mr-2.5 h-4 w-4" />
            {t("nav.myBookings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/wishlist">
            <Heart className="mr-2.5 h-4 w-4" />
            {t("nav.savedStays")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/guests">
            <Users className="mr-2.5 h-4 w-4" />
            {t("nav.savedTravelers")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/profile">
            <User className="mr-2.5 h-4 w-4" />
            {t("nav.profile")}
          </Link>
        </DropdownMenuItem>

        {isManager && (
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
          >
            <Link to="/manage/hotels">
              <Building2 className="mr-2.5 h-4 w-4" />
              {t("nav.managerConsole")}
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] focus:bg-primary/[0.06] focus:text-primary"
        >
          <Link to="/manage/settings">
            <Settings className="mr-2.5 h-4 w-4" />
            {t("nav.accountSettings")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-border/70" />
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="cursor-pointer rounded-lg px-3 py-2 text-[13.5px] text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2.5 h-4 w-4" />
          {t("nav.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
