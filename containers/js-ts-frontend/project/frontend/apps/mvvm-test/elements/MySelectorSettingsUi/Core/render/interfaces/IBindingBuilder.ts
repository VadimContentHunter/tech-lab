import { IBinding } from '../../binding/interfaces/IBinding';
import { BindingParameters } from '../BindingParameters';

/**
 * Параметры построения привязки.
 */
export interface BindingBuilderOptions {
    /**
     * HTML-элемент, для которого создаётся привязка.
     */
    element: HTMLElement;

    /**
     * Параметры, полученные из `binding-param`.
     */
    parameters: BindingParameters;

    /**
     * Контекст View.
     *
     * Обычно это ViewModel, но может быть любым объектом.
     */
    context?: unknown;
}

/**
 * Строит экземпляр привязки на основании декларации View.
 */
export interface IBindingBuilder {
    /**
     * Создаёт привязку.
     *
     * @param options Параметры построения.
     * @returns Созданная привязка.
     */
    build(options: BindingBuilderOptions): IBinding;
}
