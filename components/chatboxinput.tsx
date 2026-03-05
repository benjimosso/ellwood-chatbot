"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  IconArrowUp,
  IconCloud,
  IconGrill,
  IconParking,
  IconRuler2,
} from "@tabler/icons-react";
import { useRef } from "react";

const PROMPTS = [
  {
    icon: IconGrill,
    text: "Common areas rules",
    prompt: "What are the rules and regulations for using the common areas in our HOA community?",
  },
  {
    icon: IconRuler2,
    text: "Landscaping policy",
    prompt: "What are the landscaping and lawn maintenance requirements for homeowners?",
  },
  {
    icon: IconParking,
    text: "Parking Violations",
    prompt: "How does the HOA handle parking violations and what are the penalties?",
  },
];

export const MODELS = [
  {
    value: "o4-mini",
    name: "o4-mini",
    description: "Reasoning model (recommended)",
  },
  {
    value: "gpt-4o",
    name: "GPT-4o",
    description: "Fast and capable",
  },
  {
    value: "gpt-4o-mini",
    name: "GPT-4o mini",
    description: "Lightweight and efficient",
  },
];

export interface ChatBoxInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

export function ChatBoxInput({
  value,
  onChange,
  onSubmit,
  selectedModel,
  onModelChange,
  disabled = false,
}: ChatBoxInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptClick = (prompt: string) => {
    onChange(prompt);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  };

  const currentModel = MODELS.find((m) => m.value === selectedModel) ?? MODELS[0];

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex min-h-30 flex-col rounded-2xl cursor-text bg-card border border-border shadow-lg">
        <div className="flex-1 relative overflow-y-auto max-h-64">
          <Textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your HOA rules or policies…"
            disabled={disabled}
            className="w-full border-0 p-3 transition-[padding] duration-200 ease-in-out min-h-[48.4px] outline-none text-[16px] text-foreground resize-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent! whitespace-pre-wrap wrap-break-word"
          />
        </div>

        <div className="flex min-h-10 items-center gap-2 p-2 pb-1">
          <div className="flex aspect-1 items-center gap-1 rounded-full bg-muted p-1.5 text-xs">
            <IconCloud className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative flex items-center">
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger className="w-fit border-none bg-transparent! p-0 text-sm text-muted-foreground hover:text-foreground focus:ring-0 shadow-none">
                <SelectValue>
                  <span>{currentModel.name}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    <span>{model.name}</span>
                    <span className="text-muted-foreground block text-xs">
                      {model.description}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => { if (value.trim() && !disabled) onSubmit(); }}
              className={cn(
                "rounded-full transition-colors duration-100 ease-out cursor-pointer bg-primary",
                value.trim() && !disabled && "bg-primary hover:bg-primary/90!",
              )}
              disabled={!value.trim() || disabled}
              aria-label="Send message"
            >
              <IconArrowUp className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PROMPTS.map((button) => {
          const IconComponent = button.icon;
          return (
            <Button
              key={button.text}
              variant="ghost"
              className="group flex items-center gap-2 rounded-full border px-3 py-2 text-sm text-foreground transition-colors duration-200 ease-out hover:bg-muted/30 h-auto bg-transparent dark:bg-muted"
              onClick={() => handlePromptClick(button.prompt)}
              disabled={disabled}
            >
              <IconComponent className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span>{button.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
