import { ICommand } from './ICommand';

export class Command<T = unknown> extends EventTarget implements ICommand<T> {
    public static readonly canExecuteChangedEvent = 'canExecuteChanged';

    public constructor(
        private readonly executeAction: (parameter: T) => void,
        private readonly canExecuteAction: (parameter: T) => boolean = () => true,
        private readonly canExecuteChangedEvent?: Event
    ) {
        super();
    }

    public canExecute(parameter: T): boolean {
        return this.canExecuteAction(parameter);
    }

    public execute(parameter: T): void {
        if (!this.canExecute(parameter)) {
            return;
        }

        this.executeAction(parameter);

        const event = this.getCanExecuteChangedEvent();

        if (event !== undefined) {
            this.dispatchEvent(event);
        }
    }

    public getCanExecuteChangedEvent(): Event | undefined {
        return this.canExecuteChangedEvent;
    }
}
