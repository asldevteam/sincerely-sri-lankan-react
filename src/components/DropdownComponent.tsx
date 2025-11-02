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
  selectedOption: string[];
  onSelect: (value: string[]) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ label, options, selectedOption, onSelect }) => {
  // Build a display label from the selected values (supports multi-select)
  const selectedLabel = selectedOption.length > 0
    ? options
        .filter(option => selectedOption.includes(option.value))
        .map(option => option.label)
        .join(', ')
    : '';

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
            <DropdownMenuContent>
              {options.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => {
                    const isSelected = selectedOption.includes(option.value);
                    const newSelection = isSelected
                      ? selectedOption.filter(v => v !== option.value)
                      : [...selectedOption, option.value];
                    onSelect(newSelection);
                  }}
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