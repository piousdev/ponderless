import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { MoreHorizontal } from "lucide-react";
import RecentActivity from "@/modules/mentor/components/recent-activity";
import Mentors from "@/modules/mentor/components/mentors";
import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function MentorsPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6">
        <MentorHeader
          title="Your Mentors"
          description="Manage your one-on-one mentor relationships and interactions."
        />
        <Mentors />
      </div>

      <div className="hidden xl:block">
        <RecentActivity />
      </div>
    </div>
  );
}
