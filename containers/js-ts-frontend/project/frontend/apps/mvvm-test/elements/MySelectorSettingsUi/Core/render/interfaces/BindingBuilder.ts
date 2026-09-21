import { IBinding } from '../../binding/interfaces/IBinding';
import { BindingStrategyRegistry } from '../repositories/BindingStrategyRegistry';
import { IBindingBuilder, BindingBuilderOptions } from './IBindingBuilder';
import { BindingBuilderContext } from './IBindingStrategy';

/**
 * Базовая реализация Builder с поддержкой стратегий.
 *
 * @template T Тип создаваемого Binding.
 */
export abstract class BindingBuilder<T extends IBinding> implements IBindingBuilder {
    public constructor(private readonly strategyRegistry: BindingStrategyRegistry) {}

    /**
     * Создаёт Binding.
     *
     * Если указана стратегия, сначала выполняется её подготовка,
     * после чего создаётся конкретный Binding.
     *
     * @param options Параметры построения.
     * @returns Созданный Binding.
     */
    public build(options: BindingBuilderOptions): IBinding {
        const context = this.applyStrategy(options);

        return this.create(context);
    }

    /**
     * Создаёт конкретный Binding.
     *
     * @param context Подготовленный контекст.
     */
    protected abstract create(context: BindingBuilderContext): T;

    private applyStrategy(options: BindingBuilderOptions): BindingBuilderContext {
        if (!options.strategy) {
            return options;
        }

        const strategy = this.strategyRegistry.get(options.strategy);

        if (!strategy) {
            throw new Error(`Binding strategy "${options.strategy}" is not registered.`);
        }

        return strategy.prepare(options);
    }
}
