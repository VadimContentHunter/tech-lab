import { ObserverList } from '../observer/ObserverList';

/**
 * Параметры привязки наблюдаемого списка к HTML-элементу.
 *
 * @template T Тип элементов списка.
 */
interface ObserverListElementBindingOptions<T> {
    /**
     * Источник данных.
     */
    source: {
        /**
         * Наблюдаемый список.
         */
        list: ObserverList<T>;

        /**
         * Событие, сигнализирующее об изменении списка.
         */
        event: string;
    };

    /**
     * Представление списка.
     */
    target: {
        /**
         * HTML-элемент, содержащий представление списка.
         */
        element: HTMLElement;
    };

    /**
     * Создаёт HTML-элемент для элемента списка.
     *
     * @param item Элемент исходного списка.
     * @returns HTML-элемент, представляющий элемент списка.
     */
    createItem: (item: T) => HTMLElement;
}

/**
 * Связывает наблюдаемый список с HTML-элементом.
 *
 * При изменении исходного списка содержимое HTML-элемента
 * пересоздаётся на основе текущих элементов списка.
 *
 * Связь является односторонней:
 *
 * `ObserverList → HTMLElement`
 *
 * @template T Тип элементов списка.
 *
 * @example
 * ```ts
 * const binding = new ObserverListElementBinding({
 *     source: {
 *         list: viewModel.users,
 *         event: 'change',
 *     },
 *     target: {
 *         element: usersElement,
 *     },
 *     createItem: (user) => {
 *         const element = document.createElement('li');
 *         element.textContent = user.name;
 *
 *         return element;
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class ObserverListElementBinding<T> {
    private readonly list: ObserverList<T>;
    private readonly listEvent: string;

    private readonly element: HTMLElement;
    private readonly createItem: (item: T) => HTMLElement;

    public constructor({ source, target, createItem }: ObserverListElementBindingOptions<T>) {
        this.list = source.list;
        this.listEvent = source.event;

        this.element = target.element;
        this.createItem = createItem;
    }

    public bind(): void {
        this.list.addEventListener(this.listEvent, this.updateView);
        this.updateView();
    }

    public unbind(): void {
        this.list.removeEventListener(this.listEvent, this.updateView);
    }

    private readonly updateView = (): void => {
        const elements = this.list.items.map(this.createItem);

        this.element.replaceChildren(...elements);
    };
}
