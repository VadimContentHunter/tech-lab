import { IBinding } from '../../binding/interfaces/IBinding';
import { BindingParameters } from '../BindingParameters';

/**
 * Параметры построения Binding.
 */
export interface BindingBuilderOptions {
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
     * Имя стратегии построения.
     *
     * Если не указано, используется стандартная стратегия Builder.
     */
    strategy?: string;
}

/**
 * Создаёт конкретный Binding.
 */
export interface IBindingBuilder {
    /**
     * Создаёт Binding.
     *
     * @param options Параметры построения.
     * @returns Созданный Binding.
     */
    build(options: BindingBuilderOptions): IBinding;
}
