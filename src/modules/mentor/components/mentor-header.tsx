import {
  CheckCircle,
  MoreHorizontal,
  Clock,
  UserPlus,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";

interface IMentorHeader {
  readonly title: string;
  readonly description: string;
}

export default function MentorHeader({ title, description }: IMentorHeader) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
