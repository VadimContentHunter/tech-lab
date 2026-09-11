import type { UserData } from '../Model/UserModel';
import type { MenuItem } from '../Model/MenuModel';
import type { ClientProfilePresenter } from '../Presenter/ClientProfilePresenter';

export class ClientProfileView {
    public readonly classes = {
        profile: 'client-profile',
        menu: 'client-profile__menu',
        menuOpen: 'client-profile__menu--open',
        avatar: 'client-profile__avatar',
        email: 'client-profile__email',
        menuItem: 'client-profile__menu-item',
    } as const;
    private readonly element: HTMLElement;
    private readonly menu: HTMLElement;
    private presenter!: ClientProfilePresenter;

    constructor() {
        this.element = this.createProfile();
        this.menu = this.createMenu();
        document.addEventListener('click', (event) => {
            this.presenter.handleDocumentClick(event);
        });
    }

    public setPresenter(presenter: ClientProfilePresenter): void {
        this.presenter = presenter;
    }

    public renderProfile(user: UserData): void {
        const avatar = this.createAvatar(user);
        const email = document.createElement('span');
        email.className = this.classes.email;
        email.textContent = user.email;
        this.element.replaceChildren(avatar, email, this.menu);
    }

    public renderMenu(items: MenuItem[]): void {
        this.menu.replaceChildren();
        items.forEach((item) => {
            const menuItem = document.createElement('button');
            menuItem.className = this.classes.menuItem;
            menuItem.type = 'button';
            menuItem.textContent = item.title;
            menuItem.addEventListener('click', (event) => {
                this.presenter.handleMenuItemClick(event, item);
            });
            this.menu.append(menuItem);
        });
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public getMenu(): HTMLElement {
        return this.menu;
    }

    private createProfile(): HTMLElement {
        const element = document.createElement('div');
        element.className = this.classes.profile;
        element.addEventListener('click', (event) => {
            this.presenter.handleProfileClick(event);
        });
        return element;
    }

    private createMenu(): HTMLElement {
        const menu = document.createElement('div');
        menu.className = this.classes.menu;
        menu.addEventListener('click', (event) => {
            this.presenter.handleMenuClick(event);
        });
        return menu;
    }

    private createAvatar(user: UserData): HTMLElement {
        const container = document.createElement('div');
        container.className = this.classes.avatar;
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
