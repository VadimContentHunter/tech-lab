import { UserModel, type UserData } from '../Model/UserModel';
import { ClientProfileView } from '../View/ClientProfileView';

export class ClientProfilePresenter {
    constructor(
        private readonly model: UserModel,
        private readonly view: ClientProfileView
    ) {}

    public init(): void {
        this.render();
    }

    public mount(container: string | HTMLElement): void {
        if (typeof container === 'string') {
            const element = document.querySelector<HTMLElement>(container);
            if (!element) {
                throw new Error(`Element not found: ${container}`);
            }
            element.append(this.view.getElement());
            return;
        }
        container.append(this.view.getElement());
    }

    public renderTo(container: string | HTMLElement): void {
        this.render();
        this.mount(container);
    }

    public updateUser(data: UserData): void {
        this.model.update(data);
        this.render();
    }

    private render(): void {
        this.view.render(this.model.getData());
    }
}
