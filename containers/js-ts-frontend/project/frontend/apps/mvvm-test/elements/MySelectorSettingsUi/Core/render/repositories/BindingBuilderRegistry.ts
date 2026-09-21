import { IBindingBuilder } from '../interfaces/IBindingBuilder';

/**
 * Реестр Builder'ов для Binding.
 */
export class BindingBuilderRegistry {
    private readonly builders = new Map<string, IBindingBuilder>();

    /**
     * Регистрирует Builder.
     *
     * @param name Имя Binding из атрибута `binding`.
     * @param builder Builder для создания Binding.
     */
    public register(name: string, builder: IBindingBuilder): void {
        this.builders.set(name, builder);
    }

    /**
     * Возвращает Builder по имени Binding.
     *
     * @param name Имя Binding.
     */
    public get(name: string): IBindingBuilder | undefined {
        return this.builders.get(name);
    }

    /**
     * Проверяет наличие Builder.
     *
     * @param name Имя Binding.
     */
    public has(name: string): boolean {
        return this.builders.has(name);
    }

    /**
     * Удаляет Builder.
     *
     * @param name Имя Binding.
     */
    public delete(name: string): boolean {
        return this.builders.delete(name);
    }
}
