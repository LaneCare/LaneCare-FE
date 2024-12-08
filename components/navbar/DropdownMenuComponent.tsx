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
import { UserSession } from "@/lib/types/auth";
import { signOut } from "next-auth/react";
import { useToast } from "@/components/hooks/use-toast";

interface CustomDropdownMenuProps {
  userData?: UserSession;
}

const CustomDropdownMenu: FC<CustomDropdownMenuProps> = ({ userData }) => {
  const { toast } = useToast();
  const handleSignOut = async () => {
    //TODO: Change this route
    await signOut({ redirect: true, redirectTo: "/maps" });
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">
            {userData?.name || "RadityaDito"}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {userData?.email || "RadityaDito@gmail.com"}
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
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CustomDropdownMenu;
