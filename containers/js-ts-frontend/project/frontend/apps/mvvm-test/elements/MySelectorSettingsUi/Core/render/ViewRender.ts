import { BindingParser } from './BindingParser';

/**
 * Рендерит HTML-шаблон и автоматически инициализирует Binding.
 *
 * @example
 * ```ts
 * const renderer = new ViewRender(
 *     bindingParser,
 *     viewModel,
 * );
 *
 * const element = renderer.render(`
 *     <div>
 *         <input
 *             binding="HTMLElementBinding"
 *             binding-param="value:Title mode=two-way event=input"
 *         >
 *     </div>
 * `);
 *
 * document.body.append(element);
 * ```
 *
 * @example
 * ```ts
 * renderer.renderTo(
 *     `
 *         <div>
 *             <input
 *                 binding="HTMLElementBinding"
 *                 binding-param="value:Title mode=two-way event=input"
 *             >
 *         </div>
 *     `,
 *     document.body,
 * );
 * ```
 */
export class ViewRender {
    public constructor(
        private readonly bindingParser: BindingParser,
        private readonly context?: unknown
    ) {}

    /**
     * Создаёт HTMLElement из HTML-шаблона
     * и инициализирует найденные Binding.
     *
     * @param template HTML-шаблон.
     *
     * @returns Корневой HTML-элемент.
     */
    public render(template: string): HTMLElement {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = template.trim();
        const element = templateElement.content.firstElementChild;
        if (!(element instanceof HTMLElement)) {
            throw new Error('View template must contain an HTMLElement root element.');
        }

        this.bind(element);
        return element;
    }

    /**
     * Рендерит HTML-шаблон непосредственно в указанный элемент.
     *
     * @param template HTML-шаблон.
     * @param target Элемент, в который будет помещён результат.
     *
     * @returns Созданный корневой HTML-элемент.
     */
    public renderTo(template: string, target: HTMLElement): HTMLElement {
        const element = this.render(template);
        target.replaceChildren(element);
        return element;
    }

    private bind(root: HTMLElement): void {
        this.bindElement(root);
        const elements = root.querySelectorAll<HTMLElement>('*');
        for (const element of elements) {
            this.bindElement(element);
        }
    }

    private bindElement(element: HTMLElement): void {
        const binding = this.bindingParser.parse(element, this.context);
        binding?.bind();
    }
}
