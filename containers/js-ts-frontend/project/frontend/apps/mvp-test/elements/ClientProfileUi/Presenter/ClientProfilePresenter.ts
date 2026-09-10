import { UserModel, type UserData } from '../Model/UserModel';
import { ClientProfileView } from '../View/ClientProfileView';

export class ClientProfilePresenter {
    constructor(
        private readonly model: UserModel,
        private readonly view: ClientProfileView
    ) {
        this.view.setPresenter(this);
    }

    public init(): void {
        this.renderView();
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
        this.renderView();
        this.mount(container);
    }

    public updateUser(data: UserData): void {
        this.model.update(data);
        this.renderView();
    }

    public handleClick(): void {
        console.log('Profile clicked');
    }

    private renderView(): void {
        this.view.render(this.model.getData());
    }
}
