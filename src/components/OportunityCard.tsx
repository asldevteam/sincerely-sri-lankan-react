import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

import { Opportunity } from "./OpportunitySearch";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => {
  const [showSlots, setShowSlots] = useState(false);


  return (










    <Card className="testimonial-card  p-0   hover:border-white hover:border-2 border-2 transition-colors duration-300 hover:shadow-lg">
      <CardContent className=" p-[20px]">
        <div className='flex lg:flex-row justify-between flex-col-reverse'>
          <h3 className="text-lg font-bold mb-3">{opportunity.title}</h3>
          <div className="mb-3 w-auto max-w-fit text-xs bg-primary flex justify-center items-center rounded-full px-2 font-semibold text-black">{opportunity.category}</div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-4 ">{opportunity.description}</p>
          <div className=" text-sm gap-x-4 flex flex-col md:flex-row">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{opportunity.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{opportunity.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{opportunity.participants}</span>
            </div>
          </div>
        </div>
        <Button className="w-full h-[30px] mt-4 bg-primary hover:bg-primary/90 text-black rounded-sm text-md" onClick={() => setShowSlots(!showSlots)}>
          {showSlots ? 'Hide Slots' : 'View Slots'}

        </Button>
        {showSlots && (
          <div className='w-full mt-5'>
            <div className='w-full max-h-[200px] border border-border rounded-lg overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500'>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Slot Name</TableHead>
                    <TableHead className="w-[120px]">Starting Date</TableHead>
                    <TableHead className="w-[120px]">End Date</TableHead>
                    <TableHead className="w-[80px]">Openings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunity.slots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell className="font-medium">{slot.name}</TableCell>
                      <TableCell className="font-medium">{slot.startingDate}</TableCell>
                      <TableCell>{slot.endDate}</TableCell>
                      <TableCell>{slot.openings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button className="w-full h-[30px] mt-4 bg-primary hover:bg-primary/90 text-black rounded-sm text-md" onClick={() => window.open(opportunity.applyLink, '_blank')}>
              Apply Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;