"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, useAssistant } from "ai/react";
import { Bot, Loader2, UserRound } from "lucide-react";
import { Rubik_Glitch } from "next/font/google";
import { useEffect, useRef } from "react";

const rubikGlitch = Rubik_Glitch({ subsets: ["latin"], weight: ["400"] });

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "green",
  data: "orange",
  tool: "",
};

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({ api: "/api/assistant" });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className='flex flex-col w-full max-w-xl px-4 py-12 mx-auto items-stretch '>
      <p
        className={`text-center text-4xl md:text-5xl ${rubikGlitch.className} font-medium mb-8`}>
        AI Assistant
      </p>

      {messages.length < 1 ? (
        <div className='py-20 text-center text-2xl'>
          I am your AI assistant and ready to take your question(s). Type and
          send it.
        </div>
      ) : (
        <ScrollArea
          className='border rounded-lg p-4 sm:p-5 mb-2 h-[300px] sm:h-[400px]'
          ref={ref}>
          {error != null && (
            <div className='relative bg-red-500 text-white px-6 py-4 rounded-xl'>
              <span className='block sm:inline'>
                Error: {(error as any).toString()}
              </span>
            </div>
          )}

          {messages.map((m: Message) => (
            <div
              key={m.id}
              className='whitespace-pre-wrap'
              style={{ color: roleToColorMap[m.role] }}>
              {m.role === "user" && (
                <div className='flex font-semibold items-center gap-3 tracking-wider'>
                  <div className='border rounded-full p-2 flex-shrink-0 bg-gray-100 shadow-md'>
                    <UserRound className='flex-shrink-0' />
                  </div>{" "}
                  You
                </div>
              )}
              {m.role === "assistant" && (
                <div className='flex font-semibold items-center gap-3 tracking-wider'>
                  <div className='border rounded-full p-2 flex-shrink-0 bg-green-100 shadow-md'>
                    <Bot className='flex-shrink-0' />
                  </div>{" "}
                  AI
                </div>
              )}
              {m.role === "system" && "System"}

              {/* <strong>{`${m.role}: `}</strong> */}
              {m.role !== "data" && m.content}
              {m.role === "data" && (
                <>
                  {/* here you would provide a custom display for your app-specific data:*/}
                  {(m.data as any).description}

                  <br />
                  <pre className={"bg-gray-200"}>
                    {JSON.stringify(m.data, null, 2)}
                  </pre>
                </>
              )}
              <br />
              <br />
            </div>
          ))}

          {status === "in_progress" && (
            // <div className='h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse' />
            <Loader2 className='mb-8 animate-spin' />
          )}
        </ScrollArea>
      )}

      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className='fixed bottom-0 left-0 right-0 w-xs sm:max-w-xl mx-2 sm:mx-auto px-3 py-2 mb-8 border border-gray-300 rounded-full shadow-xl'
          value={input}
          placeholder='Ask me a question'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
