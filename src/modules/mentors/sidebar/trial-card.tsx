"use client";

import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Separator } from "@/components/shadcn/ui/separator";

interface TrialCardProps {
  currentMentors: number;
  maxMentors: number;
  currentMeetings: number;
  maxMeetings: number;
}

export default function TrialCard({
  currentMentors = 2,
  maxMentors = 5,
  currentMeetings = 3,
  maxMeetings = 10,
}: TrialCardProps) {
  const mentorProgress = (currentMentors / maxMentors) * 100;
  const meetingProgress = (currentMeetings / maxMeetings) * 100;

  return (
    <Card className="mx-4 mb-2 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <CardHeader className="px-3">
        <CardTitle className="flex items-center gap-1.5 text-base font-medium text-accent-foreground">
          <Crown className="size-3" />
          Free Trial
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-3 pb-3">
        {/* Mentors Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Mentors</span>
            <span className="font-medium text-[10px]">
              {currentMentors}/{maxMentors}
            </span>
          </div>
          <Progress
            value={mentorProgress}
            className="h-1 bg-green-500/20 [&>*]:bg-green-500"
          />
        </div>

        {/* Meetings Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Meetings</span>
            <span className="font-medium text-[10px]">
              {currentMeetings}/{maxMeetings}
            </span>
          </div>
          <Progress
            value={meetingProgress}
            className="h-1 bg-green-500/20 [&>*]:bg-green-500"
          />
        </div>

        <Separator className="my-2" />

        {/* Upgrade Button */}
        <Button asChild variant="secondary" className="w-full text-[14px]">
          <Link
            href="/pricing"
            className="flex items-center justify-center gap-1"
          >
            Upgrade
            <ArrowRight className="size-2.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
