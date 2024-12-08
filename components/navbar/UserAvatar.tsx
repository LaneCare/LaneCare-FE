import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomDropdownMenu from "./DropdownMenuComponent";
import { UserSession } from "@/lib/types/auth";

interface UserAvatarProps {
  userSession: UserSession;
}

export default function UserAvatar({ userSession }: UserAvatarProps) {
  return (
    <Card>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CardContent className="p-2 flex items-center space-x-4 cursor-pointer">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="User avatar" />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userSession.name}</p>
              <p className="text-xs text-muted-foreground">
                {userSession.role}
              </p>
            </div>
          </CardContent>
        </DropdownMenuTrigger>
        <CustomDropdownMenu userData={userSession} />
      </DropdownMenu>
      {/* 
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
           */}
    </Card>
  );
}
