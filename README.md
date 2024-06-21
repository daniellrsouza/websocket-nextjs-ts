This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About this project

The purpose of this project is to serve as template for **Next.js** projects that use **WebSocket** and **TypeScript**.

A **Custom Hook** and a **Singleton Class** was created and can be used within your components: 

`hooks/useWebSocket.ts` (custom hook)

`hooks/webSocketManager.ts` (singleton class)

### UseWebSocket Hook Example:

```typescript
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

```