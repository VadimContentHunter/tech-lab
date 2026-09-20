import { ICommand } from '../../command/ICommand';

export abstract class CommandBinding<T> {
    protected readonly command: ICommand<T>;

    protected constructor(command: ICommand<T>) {
        this.command = command;
    }

    public abstract bind(): void;

    public abstract unbind(): void;

    public dispose(): void {
        this.unbind();
    }
}
