export interface MenuItem {
    title: string;
    // action: () => void;
}

export type Avatar = {
    type: 'image' | 'icon';
    value: string;
};

export interface ClientProfileState {
    id: number;
    email: string;
    avatar: Avatar;
    isOpen: boolean;
    menuItems: MenuItem[];
}
