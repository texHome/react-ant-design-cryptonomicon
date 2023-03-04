const API_KEY: string = '3a20abbc7379ef2d63c3a3f3b78efd53a44870ee29e751b9093726e35f919ecc';
const URL: string = `wss://streamer.cryptocompare.com/v2/?api_key=${API_KEY}`;
const AGGREGATE_INDEX: string = '5';
const tickersHandlers: Map<string, (newPrice: string) => void> = new Map();
let websocket: WebSocket;


export enum SubscribeMessageType {
  SUBSCRIBE = 'SubAdd',
  UNSUBSCRIBE = 'SubRemove'
}

export type SubscribeMessage = {
  action: string,
  subs: string[]
}

export type Message = {
  TYPE: string,
  FROMSYMBOL: string,
  PRICE: number
}

export function subscribe(name: string, handler: (newPrice: string) => void): void {
  const message = getMessage(name, SubscribeMessageType.SUBSCRIBE);
  sendMessage(message);
  tickersHandlers.set(name, handler);
}

export function unsubscribe(name: string): void {
  const message = getMessage(name, SubscribeMessageType.UNSUBSCRIBE);
  sendMessage(message);
  tickersHandlers.delete(name);
}

function sendMessage(message: SubscribeMessage) {
  createWebSocket();
  const stringifiedMessage = JSON.stringify(message);

  if (websocket.readyState === WebSocket.OPEN) {
    websocket.send(stringifiedMessage);
  } else {
    websocket.addEventListener('open', () => {
        websocket.send(stringifiedMessage);
      },
      { once: true });
  }
}

function createWebSocket() {
  if (!websocket) {
    websocket = new WebSocket(URL);
  }
  addEventListener();
}

function addEventListener(): void {
  websocket.addEventListener('message', e => {
    const { TYPE: type, FROMSYMBOL: name, PRICE: newPrice } = JSON.parse(e.data);
    if (type === AGGREGATE_INDEX && newPrice !== undefined) {
      const handler = tickersHandlers.get(name);
      handler && handler(newPrice);
    }
  });
}

function getMessage(name: string, type: SubscribeMessageType): SubscribeMessage {
  return { action: type, subs: [`5~CCCAGG~${name}~USD`] };
}
