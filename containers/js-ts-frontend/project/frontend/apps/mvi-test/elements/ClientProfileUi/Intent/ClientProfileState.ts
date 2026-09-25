import { MenuItem } from '../Model/MenuProfileModel';

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
