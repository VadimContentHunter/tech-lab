export interface InputWindowOptions {
    title: string;
    label: string;
    value: string;
    inputType?: 'text' | 'email';
    validate?: (value: string) => string | null;
    onSubmit: (value: string) => void;
}

export class InputWindow {
    private readonly dialog: HTMLDialogElement;
    private readonly input: HTMLInputElement;

    constructor(private readonly options: InputWindowOptions) {
        this.dialog = document.createElement('dialog');
        this.dialog.className = 'input-window';
        this.dialog.setAttribute('aria-labelledby', 'input-window-title');

        const form = document.createElement('form');
        form.className = 'input-window__form';

        const heading = document.createElement('h2');
        heading.id = 'input-window-title';
        heading.className = 'input-window__title';
        heading.textContent = options.title;

        const label = document.createElement('label');
        label.className = 'input-window__label';
        label.textContent = options.label;

        this.input = document.createElement('input');
        this.input.className = 'input-window__input';
        this.input.type = options.inputType ?? 'text';
        this.input.value = options.value;
        this.input.required = true;
        label.append(this.input);

        const actions = document.createElement('div');
        actions.className = 'input-window__actions';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'input-window__button';
        cancelButton.type = 'button';
        cancelButton.textContent = 'Отмена';
        cancelButton.addEventListener('click', () => this.dialog.close());

        const submitButton = document.createElement('button');
        submitButton.className = 'input-window__button input-window__button--primary';
        submitButton.type = 'submit';
        submitButton.textContent = 'Сохранить';
        actions.append(cancelButton, submitButton);

        form.append(heading, label, actions);
        form.addEventListener('submit', (event) => this.handleSubmit(event));
        this.input.addEventListener('input', () => this.input.setCustomValidity(''));

        this.dialog.addEventListener('close', () => this.dialog.remove(), { once: true });
        this.dialog.append(form);
    }

    public open(): void {
        document.body.append(this.dialog);
        this.dialog.showModal();
        this.input.focus();
    }

    private handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const value = this.input.value.trim();
        const validationMessage = this.options.validate?.(value);

        if (validationMessage) {
            this.input.setCustomValidity(validationMessage);
            this.input.reportValidity();
            return;
        }

        this.options.onSubmit(value);
        this.dialog.close();
    }
}
