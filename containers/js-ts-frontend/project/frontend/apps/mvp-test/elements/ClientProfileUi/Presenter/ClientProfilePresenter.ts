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
        this.userModel.update(data);
        this.renderView();
    }

    private renderView(): void {
        this.view.render(this.userModel.getData(), this.menuModel.getItems());
        this.view.toggleMenu(this.menuModel.getIsOpen());
    }

    // Event handlers

    public handleToggleMenu(): void {
        this.menuModel.toggleMenu();
        this.view.toggleMenu(this.menuModel.getIsOpen());
    }

    public handleOpenMenu(): void {
        this.menuModel.openMenu();
        this.view.openMenu();
    }

    public handleCloseMenu(): void {
        this.menuModel.closeMenu();
        this.view.closeMenu();
    }

    public handleProfileClick(event: MouseEvent): void {
        this.handleToggleMenu();
    }

    public handleMenuClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    public handleDocumentClick(event: MouseEvent): void {
        if (!(event.target instanceof Node)) {
            return;
        }

        if (!this.view.getElement().contains(event.target)) {
            this.handleCloseMenu();
        }
    }

    public handleMenuItemClick(event: MouseEvent, item: MenuItem): void {
        event.stopPropagation();
        item.action();
        this.handleCloseMenu();
    }
}
