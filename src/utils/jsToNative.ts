declare global {
  interface Window {
    webkit?: any;
    Bridge?: any;
  }
}

type EventHandler = (payload: any) => void;
class FHEventBus {
  static uniqueIdSet = new Set<string>();
  static generateUniqueId(prefix: string): string {
    let id: string;
    do {
      id = `${prefix}_${Math.random().toString(36).substring(2, 11)}`;
    } while (this.uniqueIdSet.has(id));
    this.uniqueIdSet.add(id);
    return id;
  }
  on(key: string, handler: EventHandler): () => void {
    const eventListener = (e: CustomEvent) => handler(e.detail);
    window.addEventListener(key, eventListener as EventListener);
    return () => this.off(key, eventListener as EventListener);
  }
  off(key: string, handler: EventHandler): void {
    window.removeEventListener(key, handler as EventListener);
    if (FHEventBus.uniqueIdSet.has(key)) FHEventBus.uniqueIdSet.delete(key);
  }
  emit(key: string, ...payload: Parameters<EventHandler>): void {
    window.dispatchEvent(new CustomEvent(key, { detail: payload[0] }));
  }
  once(key: string, handler: EventHandler): void {
    const handleOnce = (payload: any) => {
      handler(payload);
      this.off(key, handleOnce as EventHandler);
    };
    this.on(key, handleOnce as EventHandler);
  }
}

export function jsToNative(
  {
    val1,
    val2,
    val3,
    val4,
  }: { val1?: string; val2?: string; val3?: string; val4?: string },
  callback: any
) {
  if (typeof window === "undefined") return;

  const eventBus = new FHEventBus();
  const callbackId = FHEventBus.generateUniqueId("callback_");
  eventBus.once(callbackId, callback);

  const userAgent = navigator.userAgent.toLowerCase();

  if (
    userAgent.match("iphone") ||
    userAgent.match("ipad") ||
    userAgent.match("ipod")
  ) {
    //아이폰
    if (val1 && val1.match("\t")) {
      val1 = encodeURIComponent(val1);
    }
    if (val2 && val2.match("\t")) {
      val2 = encodeURIComponent(val2);
    }
    if (val3 && val3.match("\t")) {
      val3 = encodeURIComponent(val3);
    }
    if (val4 && val4.match("\t")) {
      val4 = encodeURIComponent(val4);
    }

    if (window.webkit) {
      window.webkit.messageHandlers.jsToNative.postMessage(
        JSON.stringify({
          val1,
          val2,
          val3,
          val4,
          callbackId,
        })
      );
    }
  } else if (userAgent.match("android")) {
    //안드로이드
    window.Bridge.jsToNative(
      JSON.stringify({
        val1,
        val2,
        val3,
        val4,
        callbackId,
      })
    );
  }
}
