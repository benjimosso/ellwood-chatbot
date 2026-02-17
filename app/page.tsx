'use client';
import Chat from '@/components/chat';


export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#F7F9F9] via-[#BED8D4]/30 to-[#F7F9F9] flex flex-col">
      <div className="flex flex-col items-center flex-1 py-6 px-4 overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col flex-1 overflow-hidden">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold font-sans text-[#397F77] mb-2">Ellwood Management AI</h1>
            <p className="text-[#5F5566] text-lg">Your intelligent assistant for property management</p>
          </div>

            <div className="bg-[#F7F9F9] flex-1 rounded-lg shadow-2xl border border-[#BED8D4] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Chat />
            </div>
            </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-[#397F77] text-2xl mb-2">⚡</div>
              <p className="text-[#5F5566] text-sm">Instant Answers</p>
            </div>
            <div className="p-4">
              <div className="text-[#397F77] text-2xl mb-2">🔒</div>
              <p className="text-[#5F5566] text-sm">Secure & Reliable</p>
            </div>
            <div className="p-4">
              <div className="text-[#397F77] text-2xl mb-2">🎯</div>
              <p className="text-[#5F5566] text-sm">Always Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}