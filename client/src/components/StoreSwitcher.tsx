import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx"
import { ComponentProps, useState } from "react"
import { StoreDocument } from "@shared/store.document.ts"
import { useModalStore } from "@/stores/storeModal.store.ts"
import { useMatch, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Check, ChevronDownIcon, PlusCircle, StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command.tsx"

type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: StoreDocument[]
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const storeModal = useModalStore()
  const navigate = useNavigate()
  const match = useMatch("/:storeId/*")

  if (!match) return null

  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }))
  const currentStore = formattedItems.find(
    item => item.value === match.params.storeId
  )
  if (currentStore) {
    const index = formattedItems.indexOf(currentStore)
    formattedItems.splice(index, 1)
    formattedItems.unshift(currentStore)
  }

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false)
    navigate(`/${store.value}`)
    console.log("Navigate to home", store.value)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label ?? "Select a store"}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a store..." />
            <CommandEmpty>There is no store</CommandEmpty>
            <CommandGroup title="Stores">
              {formattedItems.map(item => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onStoreSelect(item)}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.openModal()
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
