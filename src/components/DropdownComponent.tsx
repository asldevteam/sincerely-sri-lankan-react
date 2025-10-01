import React from 'react'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DropdownComponentProps {

    label: string;
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
  
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ label, options, selectedOption, onSelect }) => {
  return (
    <div>


                     <div className='flex flex-col w-full  '>
                    <div className='pl-2 mb-2'>{label} </div>

                    <div className='w-full '>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full focus:outline-none">
                          <Input 
                            placeholder={label} 
                            value={selectedOption} 
                            readOnly 
                            className="w-full cursor-pointer border border-border hover:border-primary focus:border-primary focus:outline-none"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[200px] p-4 ">
                          <DropdownMenuLabel>Select {label}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {options.map(option => (
                            <DropdownMenuItem 
                              key={option} 
                              onSelect={() => onSelect(option)} 
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                            >
                              {option}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </div>



                  </div>
    </div>
  )
}

export default DropdownComponent