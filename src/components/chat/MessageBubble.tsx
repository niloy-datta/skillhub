import type { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const getMessageTypeStyles = () => {
    switch (message.type) {
      case 'system':
        return 'bg-amber/10 border-amber/30 text-amber';
      case 'mission-update':
        return 'bg-indigo/10 border-indigo/30 text-white';
      case 'crew-proposal':
        return 'bg-violet/10 border-violet/30 text-white';
      case 'typing':
        return 'bg-white/5 border-white/10 text-white/60';
      default:
        return isOwn
          ? 'bg-gradient-to-r from-indigo to-violet text-white'
          : 'bg-white/10 text-white';
    }
  };

  const formatContent = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  if (message.type === 'typing') {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-4 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[70%] gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        {!isOwn && (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm">
            {message.senderAvatar}
          </div>
        )}

        {/* Message Content */}
        <div className="flex flex-col">
          {/* Sender Name */}
          {!isOwn && (
            <span className="mb-1 text-xs font-medium text-white/60">
              {message.senderName}
            </span>
          )}

          {/* Message Bubble */}
          <div
            className={`rounded-2xl border px-4 py-3 ${getMessageTypeStyles()}`}
          >
            {/* Special Message Types */}
            {message.type === 'mission-update' && message.metadata && (
              <div className="mb-3 rounded-xl bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Mission Progress</span>
                  <span className="text-lg font-bold">{message.metadata.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo to-violet"
                    style={{ width: `${message.metadata.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/60">
                  <span>Deadline Confidence</span>
                  <span className="font-semibold text-emerald">{message.metadata.deadlineConfidence}%</span>
                </div>
              </div>
            )}

            {message.type === 'crew-proposal' && message.metadata?.options && (
              <div className="mb-3 space-y-2">
                {message.metadata.options.map((option: any, i: number) => (
                  <div key={i} className="rounded-xl bg-white/5 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">{option.name}</span>
                      <span className="text-sm font-bold text-emerald">{option.success}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-white/60">Cost</p>
                        <p className="font-semibold">${option.cost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Delivery</p>
                        <p className="font-semibold">{option.delivery} days</p>
                      </div>
                      <div>
                        <p className="text-white/60">Success</p>
                        <p className="font-semibold">{option.success}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Message Text */}
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
            />

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                    <span className="text-lg">
                      {attachment.type === 'image' ? '🖼️' : '📎'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-white/60">
                        {(attachment.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {message.reactions.map((reaction, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-xs"
                    title={reaction.userName}
                  >
                    {reaction.emoji}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Timestamp & Status */}
          <div className={`mt-1 flex items-center gap-2 text-xs text-white/40 ${
            isOwn ? 'justify-end' : ''
          }`}>
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {isOwn && (
              <span>
                {message.status === 'sent' && '✓'}
                {message.status === 'delivered' && '✓✓'}
                {message.status === 'read' && '✓✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
