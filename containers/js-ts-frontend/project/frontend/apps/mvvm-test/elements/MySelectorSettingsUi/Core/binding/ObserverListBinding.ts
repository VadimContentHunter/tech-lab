import { Binding, BindingMode } from './interfaces/Binding';
import { ObserverList } from '../observer/ObserverList';

/**
 * Параметры двусторонней привязки наблюдаемых списков.
 *
 * @template T Тип элементов списка.
 */
interface ObserverListBindingOptions<T> {
    /**
     * Направление синхронизации списков.
     *
     * `OneWay` — изменения `source` передаются в `target`.
     *
     * `TwoWay` — изменения синхронизируются между `source` и `target`.
     */
    mode: BindingMode;

    /**
     * Источник данных.
     */
    source: {
        /**
         * Наблюдаемый список-источник.
         */
        list: ObserverList<T>;

        /**
         * Событие, сигнализирующее об изменении списка.
         */
        event: string;
    };

    /**
     * Целевой список.
     */
    target: {
        /**
         * Наблюдаемый список, в который передаются изменения.
         */
        list: ObserverList<T>;

        /**
         * Событие, сигнализирующее об изменении целевого списка.
         *
         * Используется только при режиме `TwoWay`.
         */
        event: string;
    };
}

/**
 * Связывает два наблюдаемых списка.
 *
 * В режиме `OneWay` изменения передаются только от `source` к `target`.
 *
 * В режиме `TwoWay` изменения синхронизируются в обоих направлениях.
 *
 * @template T Тип элементов списка.
 *
 * @example
 * ```ts
 * const binding = new ObserverListBinding({
 *     mode: BindingMode.TwoWay,
 *     source: {
 *         list: sourceList,
 *         event: 'change',
 *     },
 *     target: {
 *         list: targetList,
 *         event: 'change',
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class ObserverListBinding<T> extends Binding {
    private readonly source: ObserverList<T>;
    private readonly sourceEvent: string;

    private readonly target: ObserverList<T>;
    private readonly targetEvent: string;

    public constructor({ mode, source, target }: ObserverListBindingOptions<T>) {
        super(mode);

        this.source = source.list;
        this.sourceEvent = source.event;

        this.target = target.list;
        this.targetEvent = target.event;
    }

    public bind(): void {
        this.source.addEventListener(this.sourceEvent, this.updateTarget);

        if (this.mode === BindingMode.TwoWay) {
            this.target.addEventListener(this.targetEvent, this.updateSource);
        }

        this.updateTarget();
    }

    public unbind(): void {
        this.source.removeEventListener(this.sourceEvent, this.updateTarget);

        this.target.removeEventListener(this.targetEvent, this.updateSource);
    }

    private readonly updateTarget = (): void => {
        this.target.items = [...this.source.items];
    };

    private readonly updateSource = (): void => {
        this.source.items = [...this.target.items];
    };
}
