import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";

export default function Home() {
  const { sendMessage, addListener } = useWebSocket();

  useEffect(() => {
    const eventListener = (data: any) => {
      console.log('Event received:', data);
      sendMessage({ message: 'We are listening' })
    };

    const unsubscribeEvent = addListener('eventName', eventListener);

    return () => {
      unsubscribeEvent();
    };
  }, [addListener, sendMessage]);

  return (
    <main className="p-24">
      Hello world with Websocket
    </main>
  );
}
