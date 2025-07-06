"use client";

import type * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { cn } from "@/lib/utils";

interface HelpAccordionSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface HelpAccordionItemProps {
  question: string;
  answer: React.ReactNode;
  value: string;
  className?: string;
}

export interface AccordionItemData {
  value: string;
  question: string;
  answer: AccordionAnswerContent;
}

export interface AccordionSectionData {
  title: string;
  items: AccordionItemData[];
  className?: string;
}

type AccordionAnswerContent =
  | string
  | {
      paragraphs?: string[];
      lists?: {
        type: "ul" | "ol";
        items: string[];
      }[];
      content?: Array<{
        type: "paragraph" | "list";
        content: string | string[];
        listType?: "ul" | "ol";
      }>;
    };

interface HelpAccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function HelpAccordion({
  type = "single",
  collapsible = true,
  className,
  children,
}: HelpAccordionProps) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}

export function HelpAccordionSection({
  title,
  children,
  className,
}: HelpAccordionSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {children}
      </Accordion>
    </div>
  );
}

// Helper function to render accordion answer content
function renderAccordionAnswer(
  answer: AccordionAnswerContent,
): React.ReactNode {
  if (typeof answer === "string") {
    return <p className="text-sm">{answer}</p>;
  }

  return (
    <div className="space-y-4 text-sm">
      {/* Render simple paragraphs */}
      {answer.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 50)}>{paragraph}</p>
      ))}

      {/* Render simple lists */}
      {answer.lists?.map((list, index) => {
        const ListComponent = list.type === "ol" ? "ol" : "ul";
        const listClass =
          list.type === "ol"
            ? "list-decimal list-inside space-y-1"
            : "list-disc list-inside space-y-1";

        return (
          <ListComponent key={`${list.type}-${index}`} className={listClass}>
            {list.items.map((item) => (
              <li key={item.slice(0, 50)}>{item}</li>
            ))}
          </ListComponent>
        );
      })}

      {/* Render mixed content */}
      {answer.content?.map((item, index) => {
        if (item.type === "paragraph") {
          return (
            <p key={`paragraph-${(item.content as string).slice(0, 50)}`}>
              {item.content as string}
            </p>
          );
        } else if (item.type === "list") {
          const ListComponent = item.listType === "ol" ? "ol" : "ul";
          const listClass =
            item.listType === "ol"
              ? "list-decimal list-inside space-y-1"
              : "list-disc list-inside space-y-1";

          return (
            <ListComponent
              key={`list-${JSON.stringify(item.content).slice(0, 50)}`}
              className={listClass}
            >
              {(item.content as string[]).map((listItem) => (
                <li key={listItem.slice(0, 50)}>{listItem}</li>
              ))}
            </ListComponent>
          );
        }
        return null;
      })}
    </div>
  );
}

export function HelpAccordionItem({
  question,
  answer,
  value,
  className,
}: HelpAccordionItemProps) {
  return (
    <AccordionItem
      value={value}
      className={cn(
        "border border-border bg-card rounded-lg px-3 py-0 shadow-sm hover:shadow-md transition-shadow mb-2 last:mb-0",
        className,
      )}
    >
      <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-2">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed pb-2">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

// Helper function to generate accordion items from data
export function HelpAccordionItemFromData({
  data,
  className,
}: {
  data: AccordionItemData;
  className?: string;
}) {
  return (
    <HelpAccordionItem
      value={data.value}
      question={data.question}
      answer={renderAccordionAnswer(data.answer)}
      className={className}
    />
  );
}

// Helper function to generate accordion section from data
export function HelpAccordionSectionFromData({
  data,
  className,
}: {
  data: AccordionSectionData;
  className?: string;
}) {
  return (
    <HelpAccordionSection title={data.title} className={className}>
      {data.items.map((item) => (
        <HelpAccordionItemFromData key={item.value} data={item} />
      ))}
    </HelpAccordionSection>
  );
}

// Helper function to generate multiple accordion sections from data
export function HelpAccordionFromData({
  sections,
  className,
}: {
  sections: AccordionSectionData[];
  className?: string;
}) {
  return (
    <HelpAccordion className={className}>
      {sections.map((section) => (
        <HelpAccordionSectionFromData key={section.title} data={section} />
      ))}
    </HelpAccordion>
  );
}
