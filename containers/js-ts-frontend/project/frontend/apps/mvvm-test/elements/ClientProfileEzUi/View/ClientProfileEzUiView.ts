import { ClientProfileEzViewModel } from '../ViewModel/ClientProfileEzViewModel';

export class ClientProfileView {
    public readonly classes = {
        profile: 'client-profile',
        profileMenuOpen: 'client-profile--menu-open',
        menu: 'client-profile__menu',
        menuOpen: 'client-profile__menu--open',
        avatar: 'client-profile__avatar',
        email: 'client-profile__email',
        menuItem: 'client-profile__menu-item',
    } as const;
    private readonly element: HTMLElement;
    private readonly menu: HTMLElement;

    constructor(private readonly viewModel: ClientProfileEzViewModel) {
        this.element = this.createProfile();
        this.menu = this.createMenu();
        this.renderProfile();
        this.renderMenu();

        this.viewModel.addEventListener(ClientProfileEzViewModel.events.isMenuOpenChanged, () => this.renderMenuState());

        document.addEventListener('click', (event) => {
            if (!(event.target instanceof Node)) {
                return;
            }

            if (!this.element.contains(event.target)) {
                this.viewModel.closeMenu();
            }
        });
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private renderProfile(): void {
        const avatar = this.createAvatar();
        const email = document.createElement('span');
        email.className = this.classes.email;
        email.textContent = this.viewModel.email;
        this.element.replaceChildren(avatar, email, this.menu);
    }

    private renderMenu(): void {
        this.menu.replaceChildren();
        this.viewModel.menuItems.forEach((item) => {
            const menuItem = document.createElement('button');
            menuItem.className = this.classes.menuItem;
            menuItem.type = 'button';
            menuItem.textContent = item.title;
            menuItem.addEventListener('click', (event) => {
                event.stopPropagation();
                this.viewModel.menuItemClick(item);
            });
            this.menu.append(menuItem);
        });
        this.renderMenuState();
    }

    private renderMenuState(): void {
        const isOpen = this.viewModel.isMenuOpen;
        this.element.classList.toggle(this.classes.profileMenuOpen, isOpen);
        this.menu.classList.toggle(this.classes.menuOpen, isOpen);
    }

    private createProfile(): HTMLElement {
        const element = document.createElement('div');
        element.className = this.classes.profile;
        element.addEventListener('click', () => this.viewModel.toggleMenu());
        return element;
    }

    private createMenu(): HTMLElement {
        const menu = document.createElement('div');
        menu.className = this.classes.menu;
        return menu;
    }

    private createAvatar(): HTMLElement {
        const container = document.createElement('div');
        container.className = this.classes.avatar;
        if (this.viewModel.avatarType === 'image') {
            const image = document.createElement('img');
            image.src = this.viewModel.avatar;
            image.alt = '';
            container.append(image);
        } else {
            const icon = document.createElement('i');
            icon.className = this.viewModel.avatar;
            container.append(icon);
        }
        return container;
    }
}
