"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface CalendarProps {
    date?: Date
    setDate: (date: Date | undefined) => void
    label: string
    
}
export function CalendarInput({ date, setDate, label }: CalendarProps) {
  const [open, setOpen] = React.useState(false)


  return (
    <div className="flex flex-col gap-2  ">
      <Label htmlFor="date" className="text-[15px] pl-1">
     {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal text-[14px] hover:bg-inherit hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary text-[#d2bc86] hover:text-[#d2bc86] "
          >
            {date ? date.toLocaleDateString() : "Select Date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            fromYear={2000}
            toYear={2030}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
