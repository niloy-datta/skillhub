import { useState } from 'react';
import type { AICommand, ChatSuggestion } from '../../types/chat';
import { AI_COMMANDS, CHAT_SUGGESTIONS } from '../../data/chat';

interface ChatInputProps {
  onSendMessage: (message: string, type?: string) => void;
  isAgentTyping?: boolean;
}

export function ChatInput({ onSendMessage, isAgentTyping }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<AICommand | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setShowCommands(false);
      setShowSuggestions(false);
    }
  };

  const handleCommandSelect = (command: AICommand) => {
    setSelectedCommand(command);
    setShowCommands(false);
    // Generate command message
    const commandMessage = `/${command.name.toLowerCase().replace(' ', '-')}`;
    setMessage(commandMessage);
  };

  const handleSuggestionClick = (suggestion: ChatSuggestion) => {
    onSendMessage(suggestion.text);
    setShowSuggestions(false);
  };

  return (
    <div className="border-t border-white/10 bg-midnight/50 p-4">
      {/* Typing Indicator */}
      {isAgentTyping && (
        <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-indigo" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span>AI is typing...</span>
        </div>
      )}

      {/* Suggestions */}
      {showSuggestions && (
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold text-white/60">SUGGESTIONS</p>
          <div className="flex flex-wrap gap-2">
            {CHAT_SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-all hover:bg-white/10"
              >
                <span className="mr-1">{suggestion.icon}</span>
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Commands */}
      {showCommands && (
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold text-white/60">AI COMMANDS</p>
          <div className="space-y-2">
            {AI_COMMANDS.map((command) => (
              <button
                key={command.id}
                onClick={() => handleCommandSelect(command)}
                className="flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 text-left transition-all hover:bg-white/10"
              >
                <span className="text-2xl">{command.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white">{command.name}</p>
                  <p className="text-xs text-white/60">{command.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Command Parameters */}
      {selectedCommand && (
        <div className="mb-3 rounded-xl border border-indigo/30 bg-indigo/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedCommand.icon}</span>
              <h3 className="font-semibold text-white">{selectedCommand.name}</h3>
            </div>
            <button
              onClick={() => setSelectedCommand(null)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            {selectedCommand.parameters.map((param) => (
              <div key={param.name}>
                <label className="mb-1 block text-xs font-medium text-white/60">
                  {param.description} {param.required && <span className="text-rose">*</span>}
                </label>
                <input
                  type={param.type === 'number' ? 'number' : 'text'}
                  placeholder={param.placeholder}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo"
                />
              </div>
            ))}
            <button
              onClick={() => {
                onSendMessage(`/${selectedCommand.name.toLowerCase().replace(' ', '-')}`);
                setSelectedCommand(null);
              }}
              className="w-full rounded-lg bg-gradient-to-r from-indigo to-violet py-2 font-semibold text-white transition-all hover:scale-105"
            >
              Execute Command
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Attach Button */}
        <button
          type="button"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Command Button */}
        <button
          type="button"
          onClick={() => {
            setShowCommands(!showCommands);
            setShowSuggestions(false);
          }}
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all ${
            showCommands ? 'bg-indigo text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message or / for commands..."
          className="flex-1 rounded-xl border-2 border-white/20 bg-white/5 px-4 py-2 text-white placeholder:text-white/40 outline-none focus:border-indigo"
        />

        {/* Suggestions Button */}
        <button
          type="button"
          onClick={() => {
            setShowSuggestions(!showSuggestions);
            setShowCommands(false);
          }}
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all ${
            showSuggestions ? 'bg-indigo text-white' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.546.546z" />
          </svg>
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-indigo to-violet text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}
