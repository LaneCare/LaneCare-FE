import { FC } from "react";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomDropdownMenuProps {}

const CustomDropdownMenu: FC<CustomDropdownMenuProps> = ({}) => {
  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Raditya Dito</p>
          <p className="text-xs leading-none text-muted-foreground">
            radit@gmail.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CustomDropdownMenu;
