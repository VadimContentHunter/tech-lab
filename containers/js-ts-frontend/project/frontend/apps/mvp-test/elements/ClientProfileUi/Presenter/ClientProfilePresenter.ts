import { MenuModel, type MenuItem } from '../Model/MenuModel';
import { UserModel, type UserData } from '../Model/UserModel';
import { ClientProfileView } from '../View/ClientProfileView';

export class ClientProfilePresenter {
    constructor(
        private readonly userModel: UserModel,
        private readonly menuModel: MenuModel,
        private readonly view: ClientProfileView
    ) {
        this.view.setPresenter(this);
    }

    public init(): void {
        this.view.renderProfile(this.userModel.getData());
        this.view.renderMenu(this.menuModel.getItems());
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
        this.init();
        this.mount(container);
    }

    // State Management

    public updateUser(data: UserData): void {
        this.userModel.update(data);
        this.view.renderProfile(this.userModel.getData());
    }

    public updateMenu(items: MenuItem[]): void {
        this.menuModel.setItems(items);
        this.view.renderMenu(this.menuModel.getItems());
    }

    public openMenu(): void {
        this.menuModel.openMenu();
        this.view.getMenu().classList.add(this.view.classes.menuOpen);
        this.view.getElement().classList.add(this.view.classes.profileMenuOpen);
    }

    public closeMenu(): void {
        this.menuModel.closeMenu();
        this.view.getMenu().classList.remove(this.view.classes.menuOpen);
        this.view.getElement().classList.remove(this.view.classes.profileMenuOpen);
    }

    public toggleMenu(): void {
        this.menuModel.toggleMenu();
        const isOpen = this.menuModel.getIsOpen();
        this.view.getMenu().classList.toggle(this.view.classes.menuOpen, isOpen);
        this.view.getElement().classList.toggle(this.view.classes.profileMenuOpen, isOpen);
    }

    // Event Handlers

    public handleProfileClick(event: MouseEvent): void {
        this.toggleMenu();
    }

    public handleMenuClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    public handleDocumentClick(event: MouseEvent): void {
        if (!(event.target instanceof Node)) {
            return;
        }
        if (!this.view.getElement().contains(event.target)) {
            this.closeMenu();
        }
    }

    public handleMenuItemClick(event: MouseEvent, item: MenuItem): void {
        event.stopPropagation();
        item.action();
        this.closeMenu();
    }
}
