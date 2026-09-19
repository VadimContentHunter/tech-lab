import { Binding, BindingMode } from './Binding';
import { ObserverProperty } from '../observer/ObserverProperty';

interface PropertyBindingOptions<T> {
    mode: BindingMode;
    element: HTMLElement;
    elementProperty: string;
    observer: ObserverProperty<T>;
    observerEvent?: string;
    elementEvent?: string;
}

export class PropertyBinding<T> extends Binding {
    private readonly element: HTMLElement;
    private readonly elementProperty: string;
    private readonly observer: ObserverProperty<T>;
    private readonly observerEvent: string;
    private readonly elementEvent: string;

    public constructor({ mode, element, elementProperty, observer, observerEvent = 'change', elementEvent = 'input' }: PropertyBindingOptions<T>) {
        super(mode);

        this.element = element;
        this.elementProperty = elementProperty;
        this.observer = observer;
        this.observerEvent = observerEvent;
        this.elementEvent = elementEvent;
    }

    public bind(): void {
        this.observer.addEventListener(this.observerEvent, this.onObserverChange);

        if (this.mode === BindingMode.TwoWay) {
            this.element.addEventListener(this.elementEvent, this.onElementChange);
        }

        this.updateElement();
    }

    public unbind(): void {
        this.observer.removeEventListener(this.observerEvent, this.onObserverChange);

        this.element.removeEventListener(this.elementEvent, this.onElementChange);
    }

    private readonly onObserverChange = (): void => {
        this.updateElement();
    };

    private readonly onElementChange = (): void => {
        this.observer.value = this.element[this.elementProperty as keyof HTMLElement] as T;
    };

    private updateElement(): void {
        Object.assign(this.element, {
            [this.elementProperty]: this.observer.value,
        });
    }
}
