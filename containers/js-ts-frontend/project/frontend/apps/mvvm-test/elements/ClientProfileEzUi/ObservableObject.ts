export type EventMap = Record<string, string>;

export abstract class ObservableObject extends EventTarget {
    protected onPropertyChanged(eventName: string): void {
        this.dispatchEvent(new Event(eventName));
    }
}
