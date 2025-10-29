"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  setStartDate: (date: Date | undefined) => void
  setEndDate: (date: Date | undefined) => void
  label: string
  className?: string
}

export function DateRangePicker({ 
  startDate, 
  endDate, 
  setStartDate, 
  setEndDate, 
  label,
  className 
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange>({
    from: startDate,
    to: endDate,
  })

  // Sync internal state with props
  React.useEffect(() => {
    setDate({ from: startDate, to: endDate })
  }, [startDate, endDate])

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDate(range)
      setStartDate(range.from)
      setEndDate(range.to)
      
    }
  }

  const formatDateRange = () => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
      }
      return format(date.from, "MMM dd, yyyy")
    }
    return "Pick a date"
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-[15px] pl-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-[14px]",
              "hover:bg-inherit hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary",
              "text-[#d2bc86] hover:text-[#d2bc86]",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
        
      </Popover>
    </div>
  )
}

// Single date picker (your original component)
interface CalendarInputProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  label: string
  className?: string
}

export function CalendarInput({ date, setDate, label, className }: CalendarInputProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-[15px] pl-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-[14px]",
              "hover:bg-inherit hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary",
              "text-[#d2bc86] hover:text-[#d2bc86]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}