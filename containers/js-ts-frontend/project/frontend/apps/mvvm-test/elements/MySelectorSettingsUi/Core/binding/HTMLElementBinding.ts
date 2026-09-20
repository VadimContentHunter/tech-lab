import { Binding, BindingMode } from './interfaces/Binding';
import { ObserverProperty } from '../observer/ObserverProperty';

/**
 * Параметры привязки HTML-элемента к наблюдаемому свойству.
 *
 * @template T Тип значения свойства.
 */
interface HTMLElementBindingOptions<T> {
    /**
     * Направление синхронизации.
     *
     * `OneWay` — изменения `observer` передаются в HTML-элемент.
     *
     * `TwoWay` — изменения синхронизируются между HTML-элементом
     * и `observer`.
     */
    mode: BindingMode;

    /**
     * HTML-элемент и его параметры привязки.
     */
    source: {
        /**
         * HTML-элемент.
         */
        element: HTMLElement;

        /**
         * Свойство HTML-элемента, участвующее в привязке.
         *
         * Например: `value`, `checked`, `textContent`.
         */
        property: string;

        /**
         * DOM-событие, сигнализирующее об изменении свойства элемента.
         */
        event: string;
    };

    /**
     * Наблюдаемое свойство.
     */
    target: {
        /**
         * Наблюдаемое свойство.
         */
        observer: ObserverProperty<T>;

        /**
         * Событие, сигнализирующее об изменении свойства.
         */
        event: string;
    };
}

/**
 * Связывает свойство HTML-элемента с наблюдаемым свойством.
 *
 * В режиме `OneWay` изменения `observer` передаются в HTML-элемент.
 *
 * В режиме `TwoWay` изменения синхронизируются между HTML-элементом
 * и `observer`.
 *
 * @template T Тип значения свойства.
 *
 * @example
 * ```ts
 * const binding = new HTMLElementBinding({
 *     mode: BindingMode.TwoWay,
 *     source: {
 *         element: input,
 *         property: 'value',
 *         event: 'input',
 *     },
 *     target: {
 *         observer: viewModel.name,
 *         event: 'change',
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
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
        this.element.addEventListener(this.elementEvent, this.updateObserver);

        this.observer.addEventListener(this.observerEvent, this.updateElement);

        this.updateElement();
    }

    public unbind(): void {
        this.element.removeEventListener(this.elementEvent, this.updateObserver);

        this.observer.removeEventListener(this.observerEvent, this.updateElement);
    }

    private readonly updateElement = (): void => {
        Object.assign(this.element, {
            [this.elementProperty]: this.observer.value,
        });
    };

    private readonly updateObserver = (): void => {
        if (this.mode !== BindingMode.TwoWay) {
            return;
        }

        this.observer.value = this.element[this.elementProperty as keyof HTMLElement] as T;
    };
}
