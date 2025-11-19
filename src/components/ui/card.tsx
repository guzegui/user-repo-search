import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A flexible content container, often used to group related information.
 *
 * @param props - Props for the Card component.
 * @param props.className - Additional class names to apply.
 */
function Card({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * The header section of a Card.
 *
 * @param props - Props for the CardHeader component.
 * @param props.className - Additional class names to apply.
 */
function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * The title of a Card, typically used within `CardHeader`.
 *
 * @param props - Props for the CardTitle component.
 * @param props.className - Additional class names to apply.
 */
function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * A descriptive text for a Card, typically used within `CardHeader`.
 *
 * @param props - Props for the CardDescription component.
 * @param props.className - Additional class names to apply.
 */
function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * A container for actions related to the Card, often placed in the header.
 *
 * @param props - Props for the CardAction component.
 * @param props.className - Additional class names to apply.
 */
function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * The main content area of a Card.
 *
 * @param props - Props for the CardContent component.
 * @param props.className - Additional class names to apply.
 */
function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * The footer section of a Card.
 *
 * @param props - Props for the CardFooter component.
 * @param props.className - Additional class names to apply.
 */
function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
