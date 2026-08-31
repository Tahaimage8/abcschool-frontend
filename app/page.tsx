import Banner from "@/component/home/banner";
import Features from "@/component/home/features";
import UnifiedAccess from "@/component/home/portal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Banner />
      <Features />
      <UnifiedAccess />
    </main>
  );
}
