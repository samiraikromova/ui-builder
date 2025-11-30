import { Plus, Settings, User, PanelLeft, LogOut, CreditCard, Sparkles, UserIcon, Pencil, Trash2, FolderInput } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
interface Chat {
  id: string;
  title: string;
}
const mockChats: Chat[] = [{
  id: "1",
  title: "Marketing campaign ideas"
}, {
  id: "2",
  title: "Video script review"
}, {
  id: "3",
  title: "Client proposal draft"
}, {
  id: "4",
  title: "Social media strategy"
}, {
  id: "5",
  title: "Ad copy variations"
}, {
  id: "6",
  title: "Email sequence planning"
}, {
  id: "7",
  title: "Content calendar creation"
}, {
  id: "8",
  title: "Brand voice development"
}];
interface SidebarProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}
export function Sidebar({
  currentChatId,
  onChatSelect,
  onNewChat
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleRenameChat = (chatId: string) => {
    console.log("Rename chat:", chatId);
    // TODO: Implement rename functionality
  };

  const handleDeleteChat = (chatId: string) => {
    console.log("Delete chat:", chatId);
    // TODO: Implement delete functionality
  };

  const handleMoveToFolder = (chatId: string, folder: string) => {
    console.log("Move chat to folder:", chatId, folder);
    // TODO: Implement folder move functionality
  };
  return <div className={cn("flex h-full flex-col border-r border-border bg-surface transition-all duration-300 overflow-y-auto flex-shrink-0", isCollapsed ? "w-14" : "w-64")}>
      {/* Header with hamburger */}
      <div className="flex items-center justify-between border-b border-border p-3">
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 rounded-lg hover:bg-surface-hover">
          <PanelLeft className="h-4 w-4 text-muted-foreground" />
        </Button>
        {!isCollapsed && <span className="text-sm font-medium text-foreground">Leveraged Creator</span>}
      </div>

      {/* New Chat Button */}
      {!isCollapsed && <div className="p-3">
          <Button onClick={onNewChat} className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-accent-hover">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>}

      {isCollapsed && <div className="p-3">
          <Button onClick={onNewChat} variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-surface-hover">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>}

      {/* Chat History */}
      {!isCollapsed && <>
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Recent</p>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-0 pb-3">
              {mockChats.map(chat => (
                <ContextMenu key={chat.id}>
                  <ContextMenuTrigger asChild>
                    <button 
                      onClick={() => onChatSelect(chat.id)} 
                      className={cn(
                        "flex w-full items-center rounded-lg px-2 py-1.5 text-left text-xs transition-colors", 
                        currentChatId === chat.id 
                          ? "bg-surface-hover text-foreground" 
                          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                      )}
                    >
                      <p className="truncate">{chat.title}</p>
                    </button>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-48">
                    <ContextMenuItem onClick={() => handleRenameChat(chat.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <FolderInput className="mr-2 h-4 w-4" />
                        Move to folder
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem onClick={() => handleMoveToFolder(chat.id, "Work")}>
                          Work
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => handleMoveToFolder(chat.id, "Personal")}>
                          Personal
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => handleMoveToFolder(chat.id, "Projects")}>
                          Projects
                        </ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem 
                      onClick={() => handleDeleteChat(chat.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          </ScrollArea>
        </>}

      {/* User Profile at bottom */}
      <div className="mt-auto border-t border-border">
        {!isCollapsed ? <div className="flex items-center gap-3 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-medium text-foreground">Cameron</p>
              <p className="truncate text-xs text-muted-foreground">50,993 credits</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-surface-hover">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Top up credits
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> : <div className="flex flex-col items-center gap-2 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700">
              <User className="h-4 w-4 text-white" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-surface-hover">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Top up credits
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>}
      </div>
    </div>;
}