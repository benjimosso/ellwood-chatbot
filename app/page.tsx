'use client';
import { useEffect, useState } from 'react';
import Chat from '@/components/chat';
import { MODELS } from '@/components/chatboxinput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Hoa {
  id: string;
  name: string;
}

export default function Home() {
  const [hoas, setHoas] = useState<Hoa[]>([]);
  const [hoaId, setHoaId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].value);
  const [loadingHoas, setLoadingHoas] = useState(true);

  useEffect(() => {
    fetch('/api/hoas')
      .then((res) => res.json())
      .then((data: Hoa[]) => {
        setHoas(data);
        if (data.length === 1) setHoaId(data[0].id);
      })
      .catch(console.error)
      .finally(() => setLoadingHoas(false));
  }, []);

  return (
    <div className="h-svh flex flex-col overflow-hidden bg-[#F7F9F9]">

      {/* Header */}
      <header className="flex items-center justify-between shrink-0 px-4 h-14 border-b border-[#BED8D4] bg-[#F7F9F9]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#397F77] tracking-tight">Ellwood Management AI</span>
        </div>
        <Select
          value={hoaId ?? ''}
          onValueChange={(val) => setHoaId(val)}
          disabled={loadingHoas || hoas.length === 0}
        >
          <SelectTrigger className="w-56 h-8 text-sm border-[#BED8D4] bg-white text-[#5F5566]">
            <SelectValue
              placeholder={
                loadingHoas
                  ? 'Loading…'
                  : hoas.length === 0
                  ? 'No associations'
                  : 'Select association…'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {hoas.map((hoa) => (
              <SelectItem key={hoa.id} value={hoa.id}>
                {hoa.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      {/* Chat fills remaining height */}
      <div className="flex flex-1 overflow-hidden">
        <Chat
          hoaId={hoaId}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </div>

    </div>
  );
}
