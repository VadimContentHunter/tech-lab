export interface ICommand<T = unknown> extends EventTarget {
    canExecute(parameter: T): boolean;
    execute(parameter: T): void;
    getCanExecuteChangedEvent(): Event | undefined;
}
