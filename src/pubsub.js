class PubSub {
  #events = new Map();

  subscribe(eventName, handler) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, new Set());
    }

    this.#events.get(eventName).add(handler);
  }

  unsubscribe(eventName, handler) {
    this.#events.get(eventName)?.delete(handler);
  }

  publish(eventName, data) {
    this.#events.get(eventName)?.forEach((handler) => handler(data));
  }
}

export const pubsub = new PubSub();
