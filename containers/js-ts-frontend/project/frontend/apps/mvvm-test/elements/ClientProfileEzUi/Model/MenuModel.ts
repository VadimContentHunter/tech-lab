import { ObservableObject } from '../ObservableObject';

export interface MenuItem {
    title: string;
    action: () => void;
}

export interface MenuData {
    items: MenuItem[];
}

export class MenuModel extends ObservableObject {
    public static readonly events = {
        itemsMenuChanged: 'itemsMenuChanged',
    } as const;

    private data: MenuData;

    constructor(data: MenuData) {
        super();
        this.data = data;
    }

    public setItems(items: MenuItem[]): void {
        if (this.data.items === items) return;

        this.data.items = items;
        this.onPropertyChanged(MenuModel.events.itemsMenuChanged);
    }

    public getItems(): MenuItem[] {
        return this.data.items;
    }
}
