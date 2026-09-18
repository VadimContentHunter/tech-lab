export class ObserverProperty<T> extends EventTarget {
    private readonly event: Event;

    public constructor(
        private _value: T,
        event: string | Event = 'change'
    ) {
        super();

        this.event = typeof event === 'string' ? new Event(event) : event;
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        if (Object.is(this._value, value)) {
            return;
        }

        this._value = value;
        this.dispatchEvent(this.event);
    }
}
