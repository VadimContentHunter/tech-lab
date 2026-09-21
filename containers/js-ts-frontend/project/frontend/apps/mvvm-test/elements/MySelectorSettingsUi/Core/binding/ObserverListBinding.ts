import { IBinding, BindingMode } from './interfaces/IBinding';
import { ObserverList } from '../observer/ObserverList';

/**
 * Параметры привязки наблюдаемых списков.
 *
 * @template T Тип элементов списка.
 */
interface ObserverListBindingOptions<T> {
    /**
     * Направление синхронизации списков.
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
         * Событие изменения списка.
         */
        event: string;
    };

    /**
     * Целевой список.
     */
    target: {
        /**
         * Наблюдаемый список-цель.
         */
        list: ObserverList<T>;

        /**
         * Событие изменения целевого списка.
         *
         * Используется только в режиме `TwoWay`.
         */
        event: string;
    };
}

/**
 * Связывает два наблюдаемых списка.
 *
 * В режиме `OneWay` изменения передаются от `source` к `target`.
 *
 * В режиме `TwoWay` изменения синхронизируются в обоих направлениях.
 *
 * @template T Тип элементов списка.
 *
 * @example
 * ```ts
 * const binding = new ObserverListBinding({
 *     mode: BindingMode.TwoWay,
 *
 *     source: {
 *         list: sourceList,
 *         event: 'change',
 *     },
 *
 *     target: {
 *         list: targetList,
 *         event: 'change',
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class ObserverListBinding<T> implements IBinding {
    private readonly mode: BindingMode;

    private readonly source: ObserverList<T>;
    private readonly sourceEvent: string;

    private readonly target: ObserverList<T>;
    private readonly targetEvent: string;

    public constructor({ mode, source, target }: ObserverListBindingOptions<T>) {
        this.mode = mode;

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

        if (this.mode === BindingMode.TwoWay) {
            this.target.removeEventListener(this.targetEvent, this.updateSource);
        }
    }

    private readonly updateTarget = (): void => {
        this.target.items = [...this.source.items];
    };

    private readonly updateSource = (): void => {
        this.source.items = [...this.target.items];
    };
}
