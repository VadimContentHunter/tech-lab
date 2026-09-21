import { IBinding, BindingMode } from './interfaces/IBinding';
import { ObserverProperty } from '../observer/ObserverProperty';

/**
 * Параметры привязки наблюдаемых свойств.
 *
 * @template T Тип значения наблюдаемых свойств.
 */
interface ObserverBindingOptions<T> {
    /**
     * Направление синхронизации.
     */
    mode: BindingMode;

    /**
     * Источник данных.
     */
    source: {
        /**
         * Наблюдаемое свойство-источник.
         */
        observer: ObserverProperty<T>;

        /**
         * Событие изменения источника.
         */
        event: string;
    };

    /**
     * Целевое свойство.
     */
    target: {
        /**
         * Наблюдаемое свойство-цель.
         */
        observer: ObserverProperty<T>;

        /**
         * Событие изменения цели.
         *
         * Используется только в режиме `TwoWay`.
         */
        event: string;
    };
}

/**
 * Связывает два наблюдаемых свойства.
 *
 * В режиме `OneWay` изменения передаются от `source` к `target`.
 *
 * В режиме `TwoWay` изменения синхронизируются в обоих направлениях.
 *
 * @template T Тип значения наблюдаемых свойств.
 *
 * @example
 * ```ts
 * const binding = new ObserverBinding({
 *     mode: BindingMode.TwoWay,
 *
 *     source: {
 *         observer: source,
 *         event: 'change',
 *     },
 *
 *     target: {
 *         observer: target,
 *         event: 'change',
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class ObserverBinding<T> implements IBinding {
    private readonly mode: BindingMode;

    private readonly source: ObserverProperty<T>;
    private readonly sourceEvent: string;

    private readonly target: ObserverProperty<T>;
    private readonly targetEvent: string;

    public constructor({ mode, source, target }: ObserverBindingOptions<T>) {
        this.mode = mode;

        this.source = source.observer;
        this.sourceEvent = source.event;

        this.target = target.observer;
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
        this.target.value = this.source.value;
    };

    private readonly updateSource = (): void => {
        this.source.value = this.target.value;
    };
}
