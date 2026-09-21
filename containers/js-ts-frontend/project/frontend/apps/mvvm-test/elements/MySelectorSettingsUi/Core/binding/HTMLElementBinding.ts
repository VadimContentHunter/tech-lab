import { ObserverProperty } from '../observer/ObserverProperty';
import { BindingMode, IBinding } from './interfaces/IBinding';

/**
 * Параметры привязки HTML-элемента к наблюдаемому свойству.
 *
 * @template T Тип значения свойства.
 */
interface HTMLElementBindingOptions<T> {
    /**
     * Направление синхронизации.
     */
    mode: BindingMode;

    /**
     * HTML-элемент и параметры привязки.
     */
    source: {
        /**
         * HTML-элемент.
         */
        element: HTMLElement;

        /**
         * Свойство HTML-элемента.
         */
        property: string;

        /**
         * DOM-событие для обратной передачи значения.
         *
         * Не требуется в режиме `OneWay`.
         */
        event?: string;
    };

    /**
     * Наблюдаемое свойство и параметры привязки.
     */
    target: {
        /**
         * Наблюдаемое свойство.
         */
        observer: ObserverProperty<T>;

        /**
         * Событие изменения наблюдаемого свойства.
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
export class HTMLElementBinding<T> implements IBinding {
    private readonly mode: BindingMode;

    private readonly element: HTMLElement;
    private readonly elementProperty: string;
    private readonly elementEvent?: string;

    private readonly observer: ObserverProperty<T>;
    private readonly observerEvent: string;

    public constructor({ mode, source, target }: HTMLElementBindingOptions<T>) {
        this.mode = mode;

        this.element = source.element;
        this.elementProperty = source.property;

        if (mode === BindingMode.TwoWay) {
            if (!source.event) {
                throw new Error('HTMLElementBinding in TwoWay mode requires an element event.');
            }

            this.elementEvent = source.event;
        }

        this.observer = target.observer;
        this.observerEvent = target.event;
    }

    public bind(): void {
        if (this.mode === BindingMode.TwoWay) {
            this.element.addEventListener(this.elementEvent!, this.updateObserver);
        }

        this.observer.addEventListener(this.observerEvent, this.updateElement);
        this.updateElement();
    }

    public unbind(): void {
        if (this.mode === BindingMode.TwoWay) {
            this.element.removeEventListener(this.elementEvent!, this.updateObserver);
        }

        this.observer.removeEventListener(this.observerEvent, this.updateElement);
    }

    private readonly updateElement = (): void => {
        Object.assign(this.element, {
            [this.elementProperty]: this.observer.value,
        });
    };

    private readonly updateObserver = (): void => {
        this.observer.value = this.element[this.elementProperty as keyof HTMLElement] as T;
    };
}
