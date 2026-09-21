/**
 * Результат разбора `binding-param`.
 *
 * @example
 * ```ts
 * new BindingParameters(
 *     'value:Title mode=two-way event=input',
 * );
 *
 * // Будет
 * // value → Title
 * // mode  → two-way
 * // event → input
 * ```
 */
export class BindingParameters {
    private readonly values = new Map<string, string>();

    public constructor(parameters: string) {
        this.parse(parameters);
    }

    /**
     * Возвращает значение параметра.
     */
    public get(name: string): string | undefined {
        return this.values.get(name);
    }

    /**
     * Проверяет наличие параметра.
     */
    public has(name: string): boolean {
        return this.values.has(name);
    }

    /**
     * Возвращает все параметры.
     */
    public entries(): IterableIterator<[string, string]> {
        return this.values.entries();
    }

    private parse(parameters: string): void {
        const tokens = parameters.trim().split(/\s+/);

        for (const token of tokens) {
            const separator = token.indexOf('=');

            if (separator !== -1) {
                const name = token.slice(0, separator);
                const value = token.slice(separator + 1);

                this.values.set(name, value);

                continue;
            }

            const colon = token.indexOf(':');

            if (colon !== -1) {
                const name = token.slice(0, colon);
                const value = token.slice(colon + 1);

                this.values.set(name, value);
            }
        }
    }
}
