import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomDropdownMenu from "./DropdownMenuComponent";
import { UserSession } from "@/lib/types/auth";

interface AvatarWithNameProps {
  userSession: UserSession;
}

const AvatarWithName: FC<AvatarWithNameProps> = ({
  userSession,
}: AvatarWithNameProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("w-[200px] justify-between max-md:hidden")}
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          {userSession.name}
          <ArrowDownUp className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <CustomDropdownMenu userData={userSession} />
    </DropdownMenu>
  );
};

export default AvatarWithName;
