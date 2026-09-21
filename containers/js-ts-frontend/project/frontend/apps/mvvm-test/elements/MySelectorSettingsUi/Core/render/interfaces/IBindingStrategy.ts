import { IBinding } from '../../binding/interfaces/IBinding';
import { BindingParameters } from '../BindingParameters';

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
}

/**
 * Определяет способ создания Binding.
 */
export interface IBindingStrategy {
    /**
     * Создаёт Binding с использованием выбранной стратегии.
     *
     * @param options Контекст построения Binding.
     * @returns Созданный Binding.
     */
    build(options: BindingBuilderContext): IBinding;
}
