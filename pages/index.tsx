import { Inter } from "next/font/google";
import { GameBoard } from "@/components/GameBoard";
import { GameStatusHeader } from "@/components/GameStatusHeader";
import { GameResultModal } from "@/components/GameResultModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between min-h-screen relative ${inter.className}`}
    >
      <GameStatusHeader />
      <GameBoard />
      {/* footer */}
      <GameResultModal />
    </main>
  );
}
