"use client";
import React from "react";
import Message from "./message";
interface MessageContainerProps extends React.ComponentProps<"div"> {
  messages: string[];
}

function MessageContainer({ messages }: MessageContainerProps) {
  return (
    <div className="flex flex-col gap-2 p-2 size-[325px] border ">
      {messages.map((massage, i) => (
        <Message key={i}>{massage}</Message>
      ))}
    </div>
  );
}

export default MessageContainer;
