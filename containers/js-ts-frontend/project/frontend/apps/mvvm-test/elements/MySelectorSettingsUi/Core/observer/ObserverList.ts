export class ObserverList<T> extends EventTarget {
    private readonly event: Event;
    private _items: T[] = [];

    public constructor(items: T[] = [], event: string | Event = 'change') {
        super();

        this.event = typeof event === 'string' ? new Event(event) : event;

        for (const item of items) {
            this.add(item, false);
        }
    }

    public get items(): readonly T[] {
        return this._items;
    }

    public set items(items: T[]) {
        this._items.length = 0;

        for (const item of items) {
            this.add(item, false);
        }

        this.dispatchEvent(this.event);
    }

    public setObject(items: Record<string, T>): void {
        this.items = Object.values(items);
    }

    public add(item: T, dispatchEvent = true): void {
        if (this._items.includes(item)) {
            return;
        }

        this._items.push(item);

        if (dispatchEvent) {
            this.dispatchEvent(this.event);
        }
    }

    public remove(item: T): void {
        const index = this._items.indexOf(item);

        if (index === -1) {
            return;
        }

        this._items.splice(index, 1);
        this.dispatchEvent(this.event);
    }

    public clear(): void {
        if (this._items.length === 0) {
            return;
        }

        this._items.length = 0;
        this.dispatchEvent(this.event);
    }

    public has(item: T): boolean {
        return this._items.includes(item);
    }

    public get size(): number {
        return this._items.length;
    }
}
