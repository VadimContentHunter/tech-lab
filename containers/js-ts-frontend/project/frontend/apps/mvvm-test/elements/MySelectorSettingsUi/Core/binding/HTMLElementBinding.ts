import { Binding, BindingMode } from './interfaces/Binding';
import { ObserverProperty } from '../observer/ObserverProperty';

interface HTMLElementBindingOptions<T> {
    mode: BindingMode;

    source: {
        element: HTMLElement;
        property: string;
        event: string;
    };

    target: {
        observer: ObserverProperty<T>;
        event: string;
    };
}

export class HTMLElementBinding<T> extends Binding {
    private readonly element: HTMLElement;
    private readonly elementProperty: string;
    private readonly elementEvent: string;

    private readonly observer: ObserverProperty<T>;
    private readonly observerEvent: string;

    public constructor({ mode, source, target }: HTMLElementBindingOptions<T>) {
        super(mode);

        this.element = source.element;
        this.elementProperty = source.property;
        this.elementEvent = source.event;

        this.observer = target.observer;
        this.observerEvent = target.event;
    }

    public bind(): void {
        this.element.addEventListener(this.elementEvent, this.onElementChange);

        this.observer.addEventListener(this.observerEvent, this.onObserverChange);

        this.updateElement();
    }

    public unbind(): void {
        this.element.removeEventListener(this.elementEvent, this.onElementChange);

        this.observer.removeEventListener(this.observerEvent, this.onObserverChange);
    }

    private readonly onElementChange = (): void => {
        if (this.mode === BindingMode.TwoWay) {
            this.updateObserver();
        }
    };

    private readonly onObserverChange = (): void => {
        this.updateElement();
    };

    private updateElement(): void {
        Object.assign(this.element, {
            [this.elementProperty]: this.observer.value,
        });
    }

    private updateObserver(): void {
        this.observer.value = this.element[this.elementProperty as keyof HTMLElement] as T;
    }
}
