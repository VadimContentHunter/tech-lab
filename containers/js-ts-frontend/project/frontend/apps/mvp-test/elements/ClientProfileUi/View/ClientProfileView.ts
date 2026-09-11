import type { UserData } from '../Model/UserModel';
import type { MenuItem } from '../Model/MenuModel';
import type { ClientProfilePresenter } from '../Presenter/ClientProfilePresenter';

export class ClientProfileView {
    private readonly element: HTMLElement;
    private readonly menu: HTMLElement;
    private presenter!: ClientProfilePresenter;

    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'client-profile';
        this.menu = document.createElement('div');
        this.menu.className = 'client-profile__menu';

        // Event listeners
        this.menu.addEventListener('click', (event) => {
            this.presenter.handleMenuClick(event);
        });
        this.element.addEventListener('click', (event) => {
            this.presenter.handleProfileClick(event);
        });
        document.addEventListener('click', (event) => {
            this.presenter.handleDocumentClick(event);
        });
    }

    public setPresenter(presenter: ClientProfilePresenter): void {
        this.presenter = presenter;
    }

    public render(user: UserData, menuItems: MenuItem[]): void {
        const avatar = this.createAvatar(user);
        const email = document.createElement('span');
        email.className = 'client-profile__email';
        email.textContent = user.email;
        this.renderMenu(menuItems);
        this.element.replaceChildren(avatar, email, this.menu);
    }

    public openMenu(): void {
        this.menu.classList.add('client-profile__menu--open');
    }

    public closeMenu(): void {
        this.menu.classList.remove('client-profile__menu--open');
    }

    public toggleMenu(isOpen: boolean): void {
        this.menu.classList.toggle('client-profile__menu--open', isOpen);
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

    private renderMenu(items: MenuItem[]): void {
        this.menu.replaceChildren();
        items.forEach((item) => {
            const menuItem = document.createElement('button');
            menuItem.className = 'client-profile__menu-item';
            menuItem.type = 'button';
            menuItem.textContent = item.title;
            menuItem.addEventListener('click', (event) => {
                this.presenter.handleMenuItemClick(event, item);
            });
            this.menu.append(menuItem);
        });
    }
}
