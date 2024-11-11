import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, PlusSquare, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-[2rem] w-[2rem]" />
          <span className="sr-only">Open settings menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href="/campgrounds/create"
            className="flex items-center cursor-pointer"
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            <span>Create Campground</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/campgrounds/dashboard"
            className="flex items-center cursor-pointer"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
