import { BindingParameters } from './BindingParameters';
import { BindingBuilderRegistry } from './BindingBuilderRegistry';
import { IBinding } from '../binding/interfaces/IBinding';

/**
 * Разбирает декларативные Binding в HTML.
 *
 * @example
 * ```ts
 * const registry = new BindingBuilderRegistry();
 *
 * registry.register(
 *     'HTMLElementBinding',
 *     new HTMLElementBindingBuilder(),
 * );
 *
 * const parser = new BindingParser(registry);
 *
 * const element = document.createElement('input');
 *
 * element.setAttribute(
 *     'binding',
 *     'HTMLElementBinding',
 * );
 *
 * element.setAttribute(
 *     'binding-param',
 *     'value:Title mode=two-way event=input',
 * );
 *
 * const binding = parser.parse(
 *     element,
 *     viewModel,
 * );
 *
 * binding?.bind();
 * ```
 */
export class BindingParser {
    public constructor(private readonly registry: BindingBuilderRegistry) {}

    /**
     * Создаёт Binding для HTML-элемента.
     *
     * Если атрибут `binding` отсутствует, возвращается `undefined`.
     *
     * @param element HTML-элемент.
     * @param context Контекст View.
     */
    public parse(element: HTMLElement, context?: unknown): IBinding | undefined {
        const bindingName = element.getAttribute('binding');

        if (!bindingName) {
            return undefined;
        }

        const builder = this.registry.get(bindingName);

        if (!builder) {
            throw new Error(`Binding builder "${bindingName}" is not registered.`);
        }

        const parameterValue = element.getAttribute('binding-param') ?? '';

        const parameters = new BindingParameters(parameterValue);

        return builder.build({
            element,
            parameters,
            context,
        });
    }
}
