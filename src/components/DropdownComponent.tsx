import React from 'react'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownComponentProps {
  label: string;
  options: DropdownOption[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ label, options, selectedOption, onSelect }) => {
  // Find the display label for the selected value
  const selectedLabel = options.find(option => option.value === selectedOption)?.label || selectedOption;

  return (
    <div>
      <div className='flex flex-col w-full'>
        <div className='pl-2 mb-2'>{label}</div>
        <div className='w-full'>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full focus:outline-none">
              <Input 
                placeholder={label} 
                value={selectedLabel} 
                readOnly 
                className="w-full cursor-pointer border border-border hover:border-primary focus:border-primary focus:outline-none"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[200px] p-4 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
              <DropdownMenuLabel>Select {label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {options.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => onSelect(option.value)} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                >
                  {option.label}
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