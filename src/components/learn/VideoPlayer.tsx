import { Play, Download, MessageSquare } from "lucide-react";
import { Lesson } from "./LearnSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  lesson: Lesson;
  contentType: "recordings" | "materials";
  onAskAI?: (lessonId: string) => void;
}

export const VideoPlayer = ({ lesson, contentType, onAskAI }: VideoPlayerProps) => {
  const handleDownloadTranscript = () => {
    if (!lesson.transcript) return;
    
    const blob = new Blob([lesson.transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.title.replace(/[^a-zA-Z0-9]/g, '_')}_transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-surface rounded-2xl overflow-hidden border border-border">
        {lesson.embedUrl ? (
          <iframe
            src={lesson.embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <Play className="h-10 w-10 text-accent fill-accent" />
              </div>
              <p className="text-sm text-muted-foreground">Video player placeholder</p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {lesson.title}
          </h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{lesson.duration}</span>
            {lesson.completed && (
              <span className="text-accent">• Completed</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {contentType === "materials" && lesson.transcript && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadTranscript}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Transcript
              </Button>
              {onAskAI && (
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => onAskAI(lesson.id)}
                  className="bg-accent hover:bg-accent/90"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI About This Video
                </Button>
              )}
            </>
          )}
        </div>

        {/* Summary for Course Materials */}
        {contentType === "materials" && lesson.summary && (
          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{lesson.summary}</p>
          </div>
        )}

        {/* Description/Notes */}
        {lesson.description && (
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.description}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
