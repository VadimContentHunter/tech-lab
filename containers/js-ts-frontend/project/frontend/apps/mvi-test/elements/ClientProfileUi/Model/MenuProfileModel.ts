export type MenuAction = 'none' | 'editProfile' | 'changeAvatar' | 'logout';

export interface MenuItem {
    title: string;
    action: MenuAction;
}

export interface MenuProfileState {
    isOpen: boolean;
    menuItems: MenuItem[];
}

export class MenuProfileModel {
    constructor(private readonly state: MenuProfileState) {}

    public openMenu(): MenuProfileState {
        return {
            ...this.state,
            isOpen: true,
        };
    }

    public closeMenu(): MenuProfileState {
        return {
            ...this.state,
            isOpen: false,
        };
    }

    public toggleMenu(): MenuProfileState {
        return {
            ...this.state,
            isOpen: !this.state.isOpen,
        };
    }

    public setItems(items: MenuItem[]): MenuProfileState {
        return {
            ...this.state,
            menuItems: [...items],
        };
    }

    public handleAction(action: MenuAction): void {
        switch (action) {
            case 'editProfile':
                console.log('Edit profile');
                break;

            case 'changeAvatar':
                console.log('Change avatar');
                break;

            case 'logout':
                console.log('Logout');
                break;

            case 'none':
                break;
        }
    }
}
