import { useCallback } from 'react';
import WebSocketManager from './webSocketManager';

type ListenerCallback = (data: any) => void;

const useWebSocket = () => {
  const sendMessage = useCallback((message: Record<string, any>): void => {
    WebSocketManager.sendMessage(message);
  }, []);

  const addListener = useCallback((action: string, callback: ListenerCallback): () => void => {
    return WebSocketManager.addListener(action, callback);
  }, []);

  return { sendMessage, addListener };
};

export default useWebSocket;
