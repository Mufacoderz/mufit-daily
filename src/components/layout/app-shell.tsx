"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { Flame } from "lucide-react";
import AOS from "aos";
import { Sidebar } from "./Sidebar";
import { MobileTopbar } from "./MobileTopbar";
import { MobileBottomNav } from "./MobileBottomNav";
import { TimerAudioProvider } from "./TimerAudioProvider";

export function AppShell({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // AOS cuma nge-scan DOM sekali pas init() di Providers.tsx (app pertama kali mount).
  // Elemen data-aos yang mount belakangan (navigasi ke /exercises atau /plans di
  // kunjungan ke-2+) gak ke-detect otomatis -> nyangkut di initial state (opacity 0)
  // sampe ada scroll/resize yang gak sengaja ngetrigger AOS buat re-check posisi.
  // Refresh tiap pathname berubah biar list item selalu ke-scan ulang & animasi jalan normal.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const userKey = session?.user?.email ?? session?.user?.name ?? "guest";

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "U";

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-off">
        <div className="flex items-center gap-2 text-gray-500">
          <Flame className="h-5 w-5 animate-pulse" style={{ color: "#C41230" }} />
          <span>Memuat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-off">
      <Sidebar session={session} handleSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar initials={initials} handleSignOut={handleSignOut} />

        <main className="flex-1 pb-28 md:pb-0">
          <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
            <TimerAudioProvider userKey={userKey}>
              {children}
            </TimerAudioProvider>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}