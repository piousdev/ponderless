import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function CommunityLoading() {
  return (
    <>
      <MentorHeader
        title="Community"
        description="Explore and connect with other mentors."
      />
      <main>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              className="transition-all hover:shadow-md w-full overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Date Block */}
                  <div className="flex-shrink-0 bg-muted/50 p-4 md:p-6 flex flex-row md:flex-col items-center justify-center md:w-32">
                    <Skeleton className="h-6 w-10 mb-1" />
                    <Skeleton className="h-4 w-12" />
                  </div>

                  {/* Main Content */}
                  <div className="p-4 md:p-6 flex-grow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-64" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-2 w-full md:w-auto flex-shrink-0">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
