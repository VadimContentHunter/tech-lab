export interface ICommand<T = unknown> {
    canExecute(parameter: T): boolean;
    execute(parameter: T): void;
    getCanExecuteChangedEvent(): Event | undefined;
}
