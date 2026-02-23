import Ai01 from "@/components/ai-01";
import { Conversation } from "@/components/ui/conversation";

export default function TestPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#F7F9F9] via-[#BED8D4]/30 to-[#F7F9F9] flex flex-col">
      <div className="flex flex-col items-center flex-1 py-6 px-4 overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col flex-1 overflow-hidden">
            <Ai01 />
          
        </div>
      </div>
    </div>
  );
}