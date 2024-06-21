type ListenerCallback = (data: any) => void;

class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: WebSocket;
  private listeners: Record<string, ListenerCallback[]> = {};

  private constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action && this.listeners[data.action]) {
        this.listeners[data.action].forEach((callback) => callback(data));
      }
    };
  }

  public static getInstance(url: string): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager(url);
    }
    return WebSocketManager.instance;
  }

  public sendMessage(message: Record<string, any>): void {
    const send = () => this.socket.send(JSON.stringify(message));
    if (this.socket.readyState === WebSocket.OPEN) {
      send();
    } else {
      this.socket.addEventListener('open', send);
    }
  }

  public addListener(action: string, callback: ListenerCallback): () => void {
    if (!this.listeners[action]) {
      this.listeners[action] = [];
    }
    this.listeners[action].push(callback);

    return () => {
      this.listeners[action] = this.listeners[action].filter((cb) => cb !== callback);
    };
  }
}

const instance = WebSocketManager.getInstance('ws://localhost:8080');
Object.freeze(instance);

export default instance;
