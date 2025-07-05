import Meetings from "@/modules/mentor/components/meetings";
import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function MeetingsPage() {
  return (
    <>
      <MentorHeader
        title="Meetings"
        description="Manage your upcoming and past sessions."
      />
      <main>
        <div className="space-y-4">
          <Meetings />
        </div>
      </main>
    </>
  );
}
