import { ClientProfileState } from '../Intent/ClientProfileState';

export interface MenuItem {
    title: string;
    action?: () => void;
}

export class MenuProfileModel {
    private isOpen: boolean;
    private items: MenuItem[];

    constructor(private state: ClientProfileState) {
        this.isOpen = state.isOpen;
        this.items = state.menuItems;
    }

    public openMenu(): ClientProfileState {
        this.isOpen = true;

        return this.getNewState();
    }

    public closeMenu(): ClientProfileState {
        this.isOpen = false;

        return this.getNewState();
    }

    public toggleMenu(): ClientProfileState {
        this.isOpen = !this.isOpen;

        return this.getNewState();
    }

    public setItems(items: MenuItem[]): ClientProfileState {
        this.items = items;

        return this.getNewState();
    }

    public getIsOpen(): boolean {
        return this.isOpen;
    }

    public getItems(): MenuItem[] {
        return this.items;
    }

    private getNewState(): ClientProfileState {
        return {
            ...this.state,
            isOpen: this.isOpen,
            menuItems: [...this.items],
        };
    }
}
