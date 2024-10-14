"use client";

import { useEffect, useState } from "react";
import { socket } from "../../socket";

export default function Home() {
  const [text, setText] = useState("default");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();

      socket.on("update-input", (msg) => {
        setText(msg);
      });
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function handleChange(val: string) {
    setText(val);
    socket.emit("input-change", val);
  }

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      <input
        className="text-black p-1"
        value={text}
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
