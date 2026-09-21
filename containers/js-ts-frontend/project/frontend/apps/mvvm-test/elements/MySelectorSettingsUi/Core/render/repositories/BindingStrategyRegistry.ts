import { IBindingStrategy } from '../interfaces/IBindingStrategy';

/**
 * Реестр стратегий построения Binding.
 */
export class BindingStrategyRegistry {
    private readonly strategies = new Map<string, IBindingStrategy>();

    /**
     * Регистрирует стратегию.
     *
     * @param name Имя стратегии.
     * @param strategy Реализация стратегии.
     */
    public register(name: string, strategy: IBindingStrategy): void {
        this.strategies.set(name, strategy);
    }

    /**
     * Возвращает стратегию по имени.
     *
     * @param name Имя стратегии.
     */
    public get(name: string): IBindingStrategy | undefined {
        return this.strategies.get(name);
    }

    /**
     * Проверяет наличие стратегии.
     *
     * @param name Имя стратегии.
     */
    public has(name: string): boolean {
        return this.strategies.has(name);
    }

    /**
     * Удаляет стратегию.
     *
     * @param name Имя стратегии.
     */
    public delete(name: string): boolean {
        return this.strategies.delete(name);
    }
}
