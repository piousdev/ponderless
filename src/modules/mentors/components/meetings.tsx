import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Clock, Video, MessageSquare } from "lucide-react";

const meetings = [
  {
    title: "Intro to Cognitive Biases",
    mentor: "Dr. Evelyn Reed",
    date: "July 10, 2025",
    time: "2:00 PM",
    status: "Upcoming",
  },
  {
    title: "Systems Thinking Workshop",
    mentor: "Dr. Anya Sharma",
    date: "July 12, 2025",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    title: "Heuristics and Biases",
    mentor: "Dr. Sophia Patel",
    date: "July 15, 2025",
    time: "11:00 AM",
    status: "Upcoming",
  },
];

const recentMeetingsActivity = [
  { title: "Meeting Scheduled", description: "Intro to Cognitive Biases" },
  {
    title: "Transcript Ready",
    description: "From your chat with Julian Costa",
  },
  {
    title: "Recording Available",
    description: "From your call with Marcus Thorne",
  },
];

export default function Meetings() {
  return (
    <div className="space-y-4">
      {meetings.map((meeting, index) => (
        <Card
          key={index}
          className="transition-all hover:shadow-md w-full overflow-hidden"
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Date Block */}
              <div className="flex-shrink-0 bg-muted/50 p-4 md:p-6 flex flex-row md:flex-col items-center justify-center md:w-32">
                <p className="font-bold text-lg md:text-2xl text-primary mr-2 md:mr-0 md:mb-1">
                  {meeting.date.split(" ")[1].replace(",", "")}
                </p>
                <p className="text-md md:text-lg text-muted-foreground">
                  {meeting.date.split(" ")[0]}
                </p>
              </div>

              {/* Main Content */}
              <div className="p-4 md:p-6 flex-grow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-card-foreground">
                    {meeting.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    with{" "}
                    <span className="font-medium text-foreground/90">
                      {meeting.mentor}
                    </span>{" "}
                    &middot; {meeting.time}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-2 w-full md:w-auto flex-shrink-0">
                  {meeting.status === "Upcoming" && (
                    <>
                      <Button
                        className="w-full md:w-auto cursor-pointer"
                        variant="ghost"
                      >
                        <MessageSquare className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Join Chat</span>
                      </Button>
                      <Button
                        className="w-full md:w-auto cursor-pointer"
                        variant="secondary"
                      >
                        <Video className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Join Call</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
