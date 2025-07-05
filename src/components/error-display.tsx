"use client";

import { Button } from "@/components/shadcn/ui/button";
import { AlertTriangle } from "lucide-react";

interface IErrorDisplay {
  title: string;
  message: string;
  onResetAction: () => void;
}

export function ErrorDisplay({ title, message, onResetAction }: IErrorDisplay) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-xl font-semibold text-destructive">{title}</h2>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">{message}</p>
      <Button onClick={onResetAction}>Try Again</Button>
    </div>
  );
}
