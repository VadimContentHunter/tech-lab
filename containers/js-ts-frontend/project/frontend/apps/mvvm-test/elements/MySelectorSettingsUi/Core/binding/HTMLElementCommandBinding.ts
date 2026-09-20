import { ICommand } from '../command/ICommand';

/**
 * Параметры привязки HTML-элемента к команде.
 *
 * @template T Тип параметра команды.
 */
interface HTMLElementCommandBindingOptions<T> {
    /**
     * Источник события, вызывающего выполнение команды.
     */
    source: {
        /**
         * HTML-элемент, на событие которого устанавливается привязка.
         */
        element: HTMLElement;

        /**
         * Название DOM-события.
         */
        event: string;
    };

    /**
     * Команда, выполняемая при возникновении события источника.
     */
    target: {
        /**
         * Команда.
         */
        command: ICommand<T>;

        /**
         * Параметр, передаваемый в `command.execute()`.
         */
        parameter: T;
    };

    /**
     * Дополнительное действие, выполняемое при проверке доступности команды.
     *
     * Первым аргументом передаётся результат `command.canExecute()`,
     * вторым — исходный HTML-элемент.
     *
     * Если действие не указано, дополнительная обработка не выполняется.
     */
    action?: (enabled: boolean, source: HTMLElement) => void;
}

/**
 * Связывает событие HTML-элемента с выполнением команды.
 *
 * При возникновении события источника вызывается
 * `command.execute(parameter)`.
 *
 * При привязке выполняется первоначальная проверка `canExecute()`.
 * Если команда предоставляет событие `CanExecuteChanged`, binding
 * подписывается на него и повторно проверяет доступность команды
 * при каждом соответствующем событии.
 *
 * @template T Тип параметра команды.
 *
 * @example
 * ```ts
 * const binding = new HTMLElementCommandBinding({
 *     source: {
 *         element: button,
 *         event: 'click',
 *     },
 *     target: {
 *         command: saveCommand,
 *         parameter: undefined,
 *     },
 *     action: (enabled, source) => {
 *         source.toggleAttribute('disabled', !enabled);
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class HTMLElementCommandBinding<T> {
    private readonly element: HTMLElement;
    private readonly elementEvent: string;

    private readonly command: ICommand<T>;
    private readonly parameter: T;

    private readonly action: (enabled: boolean, source: HTMLElement) => void;

    public constructor({ source, target, action = () => {} }: HTMLElementCommandBindingOptions<T>) {
        this.element = source.element;
        this.elementEvent = source.event;

        this.command = target.command;
        this.parameter = target.parameter;

        this.action = action;
    }

    public bind(): void {
        this.element.addEventListener(this.elementEvent, this.onElementEvent);

        const event = this.command.getCanExecuteChangedEvent();

        if (event !== undefined) {
            this.command.addEventListener(event.type, this.onCanExecuteChanged);
        }

        this.updateCanExecute();
    }

    public unbind(): void {
        this.element.removeEventListener(this.elementEvent, this.onElementEvent);

        const event = this.command.getCanExecuteChangedEvent();

        if (event !== undefined) {
            this.command.removeEventListener(event.type, this.onCanExecuteChanged);
        }
    }

    public dispose(): void {
        this.unbind();
    }

    private readonly onElementEvent = (): void => {
        this.command.execute(this.parameter);
    };

    private readonly onCanExecuteChanged = (): void => {
        this.updateCanExecute();
    };

    private updateCanExecute(): void {
        this.action(this.command.canExecute(this.parameter), this.element);
    }
}
