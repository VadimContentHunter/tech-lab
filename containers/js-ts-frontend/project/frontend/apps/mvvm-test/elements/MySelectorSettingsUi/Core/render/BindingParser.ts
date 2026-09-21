import { IBinding } from '../binding/interfaces/IBinding';
import { BindingBuilderRegistry } from './repositories/BindingBuilderRegistry';
import { BindingParameters } from './repositories/BindingParameters';

/**
 * Разбирает декларативные Binding в HTML.
 *
 * @example
 * ```ts
 * const parser = new BindingParser(registry);
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

        const parameters = new BindingParameters(element.getAttribute('binding-param') ?? '');
        const strategy = element.getAttribute('binding-strategy');
        return builder.build({
            element,
            parameters,
            ...(context !== undefined && { context }),
            ...(strategy !== null && { strategy }),
        });
    }
}
