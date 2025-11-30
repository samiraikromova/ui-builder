import { X, GripVertical, FileIcon, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilePreviewModalProps {
  files: File[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemove: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function FilePreviewModal({
  files,
  open,
  onOpenChange,
  onRemove,
  onReorder,
}: FilePreviewModalProps) {
  const moveUp = (index: number) => {
    if (index > 0) {
      onReorder(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < files.length - 1) {
      onReorder(index, index + 1);
    }
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Attached Files ({files.length})</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-2 pr-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-hover">
                  {isImage(file) ? (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
