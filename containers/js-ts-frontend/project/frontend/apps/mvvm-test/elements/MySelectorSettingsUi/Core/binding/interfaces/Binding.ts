export enum BindingMode {
    OneWay,
    TwoWay,
}

export abstract class Binding {
    protected constructor(protected readonly mode: BindingMode) {}

    public abstract bind(): void;

    public abstract unbind(): void;

    public dispose(): void {
        this.unbind();
    }
}
