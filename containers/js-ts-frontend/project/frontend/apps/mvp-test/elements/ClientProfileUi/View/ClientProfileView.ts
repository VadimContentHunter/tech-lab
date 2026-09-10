import type { UserData } from '../Model/UserModel';
import type { ClientProfilePresenter } from '../Presenter/ClientProfilePresenter';

export class ClientProfileView {
    private readonly element: HTMLElement;
    private presenter!: ClientProfilePresenter;

    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'client-profile';
        this.element.addEventListener('click', () => {
            this.presenter.handleClick();
        });
    }

    public setPresenter(presenter: ClientProfilePresenter): void {
        this.presenter = presenter;
    }

    public render(user: UserData): void {
        this.element.innerHTML = '';
        const avatar = this.createAvatar(user);
        const email = document.createElement('span');
        email.className = 'client-profile__email';
        email.textContent = user.email;
        this.element.append(avatar, email);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private createAvatar(user: UserData): HTMLElement {
        const container = document.createElement('div');
        container.className = 'client-profile__avatar';
        if (user.avatar.type === 'image') {
            const image = document.createElement('img');
            image.src = user.avatar.value;
            image.alt = '';
            container.append(image);
        } else {
            const icon = document.createElement('i');
            icon.className = user.avatar.value;
            container.append(icon);
        }
        return container;
    }
}
