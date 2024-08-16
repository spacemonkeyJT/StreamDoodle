export default class EventList<T> {
  private handlers: Array<T> = []

  subscribe(handler: T): () => void {
    this.handlers.push(handler)
    return () => {
      const index = this.handlers.findIndex(item => item === handler)
      if (index !== -1) {
        this.handlers.splice(index, 1)
      }
    }
  }

  invoke(...args: unknown[]) {
    for (const handler of this.handlers) {
      (handler as (...a: unknown[]) => unknown)(...args)
    }
  }
}
