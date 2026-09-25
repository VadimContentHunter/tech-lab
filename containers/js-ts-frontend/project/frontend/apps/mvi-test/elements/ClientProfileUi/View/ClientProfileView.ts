import { ClientProfileState } from '../Intent/ClientProfileState';
import { MenuAction } from '../Model/MenuProfileModel';

export interface ClientProfileViewEvents {
    profileClicked(): void;
    outsideClicked(): void;
    menuAction(action: MenuAction): void;
}

export class ClientProfileView {
    public readonly classes = {
        profile: 'client-profile',
        profileOpen: 'client-profile--open',
        avatar: 'client-profile__avatar',
        email: 'client-profile__email',
        menu: 'client-profile__menu',
        menuOpen: 'client-profile__menu--open',
        menuItem: 'client-profile__menu-item',
    } as const;

    private readonly element: HTMLElement;
    private readonly menu: HTMLElement;
    private readonly events: ClientProfileViewEvents;

    constructor(events: ClientProfileViewEvents) {
        this.events = events;

        this.element = document.createElement('section');
        this.element.className = this.classes.profile;
        this.element.setAttribute('aria-label', 'Client profile');

        this.menu = document.createElement('div');
        this.menu.className = this.classes.menu;
        this.menu.setAttribute('role', 'menu');

        this.element.addEventListener('click', () => {
            this.events.profileClicked();
        });

        document.addEventListener('click', (event) => {
            if (!this.element.contains(event.target as Node)) {
                this.events.outsideClicked();
            }
        });
    }

    public render(state: ClientProfileState): void {
        const { user, menu } = state;

        this.element.classList.toggle(this.classes.profileOpen, menu.isOpen);

        this.menu.classList.toggle(this.classes.menuOpen, menu.isOpen);

        this.element.setAttribute('aria-expanded', String(menu.isOpen));

        const avatar = this.createAvatar(user.avatar);

        const email = document.createElement('span');
        email.className = this.classes.email;
        email.textContent = user.email;

        this.element.replaceChildren(avatar, email, this.menu);

        this.renderMenu(menu);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private renderMenu(state: ClientProfileState['menu']): void {
        this.menu.replaceChildren();

        for (const item of state.menuItems) {
            const menuItem = document.createElement('button');

            menuItem.className = this.classes.menuItem;
            menuItem.type = 'button';
            menuItem.textContent = item.title;
            menuItem.setAttribute('role', 'menuitem');

            menuItem.addEventListener('click', (event) => {
                event.stopPropagation();

                this.events.menuAction(item.action);
            });

            this.menu.append(menuItem);
        }
    }

    private createAvatar(avatar: ClientProfileState['user']['avatar']): HTMLElement {
        const container = document.createElement('div');

        container.className = this.classes.avatar;
        container.setAttribute('aria-hidden', 'true');

        if (avatar.type === 'image') {
            const image = document.createElement('img');

            image.src = avatar.value;
            image.alt = '';

            container.append(image);
        } else {
            const icon = document.createElement('i');

            icon.className = avatar.value;

            container.append(icon);
        }

        return container;
    }
}
