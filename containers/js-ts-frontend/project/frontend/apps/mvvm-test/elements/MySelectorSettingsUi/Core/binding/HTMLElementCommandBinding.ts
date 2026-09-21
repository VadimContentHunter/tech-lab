import { ICommand } from '../command/ICommand';
import { IBinding } from './interfaces/IBinding';

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
     * Обновляет состояние HTML-элемента в зависимости от доступности команды.
     *
     * @param enabled Результат проверки `command.canExecute()`.
     * @param source HTML-элемент, связанный с командой.
     */
    updateElementState?: (enabled: boolean, source: HTMLElement) => void;
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
 *     updateElementState: (enabled, source) => {
 *         source.toggleAttribute('disabled', !enabled);
 *     },
 * });
 *
 * binding.bind();
 * ```
 */
export class HTMLElementCommandBinding<T> implements IBinding {
    private readonly element: HTMLElement;
    private readonly elementEvent: string;

    private readonly command: ICommand<T>;
    private readonly parameter: T;

    private readonly updateElementState: (enabled: boolean, source: HTMLElement) => void;

    public constructor({ source, target, updateElementState = () => {} }: HTMLElementCommandBindingOptions<T>) {
        this.element = source.element;
        this.elementEvent = source.event;

        this.command = target.command;
        this.parameter = target.parameter;

        this.updateElementState = updateElementState;
    }

    public bind(): void {
        this.element.addEventListener(this.elementEvent, this.onElementEvent);

        const event = this.command.getCanExecuteChangedEvent();

        if (event !== undefined) {
            this.command.addEventListener(event.type, this.onCanExecuteChanged);
        }

        this.updateState();
    }

    public unbind(): void {
        this.element.removeEventListener(this.elementEvent, this.onElementEvent);

        const event = this.command.getCanExecuteChangedEvent();

        if (event !== undefined) {
            this.command.removeEventListener(event.type, this.onCanExecuteChanged);
        }
    }

    private readonly onElementEvent = (): void => {
        this.command.execute(this.parameter);
    };

    private readonly onCanExecuteChanged = (): void => {
        this.updateState();
    };

    private readonly updateState = (): void => {
        this.updateElementState(this.command.canExecute(this.parameter), this.element);
    };
}
