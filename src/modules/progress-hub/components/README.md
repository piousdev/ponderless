# Calendar Component

The Calendar Component is a flexible, reusable component for displaying events in different view modes. It supports assessment schedules, meetings, exams, and other calendar events with **interactive day management**.

## 🚀 **New Interactive Features**

### **Clickable Days**
- **All view modes** now have clickable days for easy event management
- **Visual indicators** show that days are interactive (hover effects, mouse pointer icons)
- **Conditional dialogs** based on whether a day has existing events or not

### **Event Management Dialog**
- **Create Events**: Click on any empty day to create new events
- **Edit Events**: Click on days with existing events to edit or delete them
- **Multiple Events**: Add multiple events to the same day
- **Full CRUD Operations**: Create, Read, Update, Delete events seamlessly

## Features

- **Multiple View Modes**: Compact, Stacked, Details, and List views
- **Interactive Days**: Click any day to manage events
- **Event Types**: Assessment, Exam, Review, Meeting
- **Priority Levels**: Low, Medium, High
- **Status Tracking**: Scheduled, Completed, Cancelled
- **Color Coding**: Blue, Green, Red, Yellow, Purple
- **Responsive Design**: Works on mobile and desktop
- **Real-time Updates**: Events update immediately in the calendar

## Usage

### Basic Usage with Interactive Features

```typescript
import CalendarComponent from "@/modules/progress-hub/components/calendar";
import { createCalendarEvents } from "@/types/calendar";
import type { CalendarEvent } from "@/types/calendar";

// Create your events data
const events: CalendarEvent[] = createCalendarEvents([
  {
    id: "event-1",
    date: new Date(2025, 0, 15), // January 15, 2025
    title: "Assessment Session",
    description: "Cognitive skills assessment",
    time: "10:00 AM",
    duration: "2 hours",
    type: "assessment",
    priority: "high",
    color: "blue",
    status: "scheduled",
  },
  // ... more events
]);

// Use the component - days are automatically clickable
<CalendarComponent 
  events={events}
  initialDate={new Date(2025, 0, 1)}
  initialViewMode="stacked"
/>
```

### Interactive Behavior

#### **Clicking Empty Days**
- Opens a dialog to create a new event
- Pre-fills the date automatically
- Shows a clean form for event creation

#### **Clicking Days with Events**
- Shows all existing events for that day
- Click any event to edit it
- Option to add additional events
- Delete events with confirmation

#### **Visual Indicators**
- **Hover Effects**: Days highlight on hover
- **Mouse Pointer Icons**: Subtle indicators that days are clickable
- **Helper Text**: "Click days to manage events" in the header
- **Event Previews**: See event details on hover

### Event Dialog Features

#### **Conditional Content**
- **No Events**: Shows "Create Event" interface
- **Has Events**: Shows event list + "Add New" option
- **Editing**: Shows form pre-filled with event data

#### **Form Validation**
- Required fields marked with asterisks
- Real-time validation feedback
- Disabled save button until valid

#### **Event Operations**
- **Create**: Add new events to any day
- **Edit**: Modify existing event details
- **Delete**: Remove events with confirmation
- **Cancel**: Close without saving changes

## Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `events` | `CalendarEvent[]` | No | `[]` | Array of events to display |
| `initialDate` | `Date` | No | `new Date()` | Initial date to display |
| `initialViewMode` | `ViewMode` | No | `"stacked"` | Initial view mode |

**Note**: The component automatically handles event state management internally. Events passed via props are used as initial data, and the component maintains its own state for real-time updates.

### View Modes with Interactive Features

#### **Compact View**
- Shows events as colored dots
- Click anywhere on the day cell
- Hover shows mouse pointer icon

#### **Stacked View**
- Shows events as colored boxes with titles
- Click anywhere on the day cell
- Events are non-interactive (clicking the day opens dialog)

#### **Details View**
- Shows events in detailed cards
- Responsive grid layout (1 col mobile, 2 col tablet, 7 col desktop)
- Hover effects on entire day card
- "Click to add event" text for empty days

#### **List View**
- Shows all events in a vertical list
- Not clickable (events displayed chronologically)
- Good for overview of all monthly events

### Event Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the event |
| `date` | `Date` | Yes | Event date |
| `title` | `string` | Yes | Event title |
| `description` | `string` | No | Event description |
| `time` | `string` | Yes | Event time (e.g., "10:00 AM") |
| `duration` | `string` | No | Event duration (e.g., "2 hours") |
| `type` | `EventType` | Yes | Event type: "assessment", "exam", "review", "meeting" |
| `priority` | `EventPriority` | Yes | Priority: "low", "medium", "high" |
| `color` | `EventColor` | Yes | Color: "blue", "green", "red", "yellow", "purple" |
| `status` | `EventStatus` | No | Status: "scheduled", "completed", "cancelled" |

### Color Coding

Events are color-coded based on the `color` property:
- **Blue**: General assessments
- **Green**: Successful/completed items
- **Red**: High priority/urgent items
- **Yellow**: Meetings/reviews
- **Purple**: Special assessments

### Utility Functions

The `@/types/calendar` module provides utility functions:

```typescript
import { createCalendarEvent, createCalendarEvents } from "@/types/calendar";

// Create a single event
const event = createCalendarEvent({
  date: new Date(),
  title: "Test Event",
  time: "2:00 PM",
  type: "assessment",
  priority: "medium",
  color: "blue",
});

// Create multiple events
const events = createCalendarEvents([
  { /* event data */ },
  { /* event data */ },
]);
```

## Examples

### Complete Page Implementation

```typescript
// pages/schedule.tsx
"use client";

import { CalendarIcon } from "lucide-react";
import CalendarComponent from "@/modules/progress-hub/components/calendar";
import { createCalendarEvents } from "@/types/calendar";

const events = createCalendarEvents([
  // ... your events
]);

export default function SchedulePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8" />
          Assessment Schedule
        </h1>
        <p className="text-sm text-muted-foreground">
          Click on any day to create new events or edit existing ones
        </p>
      </div>
      
      <CalendarComponent 
        events={events}
        initialDate={new Date(2025, 0, 1)}
        initialViewMode="stacked"
      />
    </div>
  );
}
```

### Assessment Schedule Example

```typescript
const assessmentSchedule = createCalendarEvents([
  {
    date: new Date(2025, 0, 5),
    title: "Cognitive Processing Speed",
    description: "Assess information processing speed and accuracy",
    time: "9:00 AM",
    duration: "45 minutes",
    type: "assessment",
    priority: "high",
    color: "blue",
    status: "scheduled",
  },
  {
    date: new Date(2025, 0, 12),
    title: "Decision Making Under Uncertainty",
    description: "Evaluate decision-making strategies",
    time: "2:30 PM",
    duration: "2 hours",
    type: "exam",
    priority: "high",
    color: "red",
    status: "scheduled",
  },
]);
```

## Integration

The calendar component is designed to work seamlessly with other parts of the application:

- **Event State Management**: Handles create, read, update, delete operations internally
- **Real-time Updates**: Changes reflect immediately in the UI
- **Responsive Design**: Works on all screen sizes with appropriate interactions
- **Accessibility**: Proper keyboard navigation and screen reader support
- **User Experience**: Clear visual feedback and intuitive interactions

## Key Benefits

✅ **No External Buttons Needed**: All event management happens through day clicks  
✅ **Intuitive UX**: Users naturally understand they can click on calendar days  
✅ **Context-Aware**: Dialogs show relevant options based on existing events  
✅ **Responsive**: Touch-friendly on mobile, precise on desktop  
✅ **Visual Feedback**: Clear hover states and interaction indicators  
✅ **Accessible**: Proper semantic HTML and keyboard navigation  

For a complete example, see the `src/app/(dashboard)/progress-hub/assessments/schedule/page.tsx` file. 