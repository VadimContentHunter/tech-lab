import { BindingParameters } from '../repositories/BindingParameters';

/**
 * Контекст построения Binding.
 */
export interface BindingBuilderContext {
    /**
     * HTML-элемент, для которого создаётся Binding.
     */
    element: HTMLElement;

    /**
     * Параметры из `binding-param`.
     */
    parameters: BindingParameters;

    /**
     * Контекст View.
     */
    context?: unknown;

    /**
     * Дополнительные данные стратегии.
     */
    strategyContext?: unknown;
}

/**
 * Определяет способ подготовки данных для создания Binding.
 */
export interface IBindingStrategy {
    /**
     * Подготавливает контекст для Builder.
     *
     * @param options Исходный контекст построения.
     * @returns Подготовленный контекст.
     */
    prepare(options: BindingBuilderContext): BindingBuilderContext;
}
