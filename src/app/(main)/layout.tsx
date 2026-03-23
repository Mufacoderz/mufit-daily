import MainSidebar from '@/components/main/MainSidebar'
import MainBottomNav from '@/components/main/MainBottomNav'
import TopBar from '@/components/TopBar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
      <MainSidebar />
      <div className="flex-1 md:ml-[240px]">
        <TopBar />
        <main className="pb-24 md:pb-8 pt-14 md:pt-0 min-h-screen">
          {children}
        </main>
      </div>
      <MainBottomNav />
    </div>
  )
}
