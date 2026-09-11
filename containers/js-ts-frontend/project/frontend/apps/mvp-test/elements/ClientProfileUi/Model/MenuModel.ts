export interface MenuItem {
    title: string;
    action: () => void;
}

export interface MenuData {
    isOpen: boolean;
    items: MenuItem[];
}

export class MenuModel {
    private data: MenuData;

    constructor(data: MenuData) {
        this.data = data;
    }

    public setOpen(isOpen: boolean): void {
        this.data.isOpen = isOpen;
    }

    public openMenu(): void {
        this.setOpen(true);
    }

    public closeMenu(): void {
        this.setOpen(false);
    }

    public getIsOpen(): boolean {
        return this.data.isOpen;
    }

    public toggleMenu(): void {
        this.setOpen(!this.data.isOpen);
    }

    public setItems(items: MenuItem[]): void {
        this.data.items = items;
    }

    public getItems(): MenuItem[] {
        return this.data.items;
    }
}
