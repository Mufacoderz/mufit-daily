import StudioSidebar from '@/components/studio/StudioSidebar'
import StudioBottomNav from '@/components/studio/StudioBottomNav'
import TopBar from '@/components/TopBar'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-stone-950 text-white font-body">
      <StudioSidebar />
      <div className="flex-1 md:ml-[240px]">
        <TopBar />
        <main className="px-4 md:px-8 pt-20 md:pt-10 pb-28 md:pb-10 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
      <StudioBottomNav />
    </div>
  )
}
