import { ClientProfileState } from '../Intent/ClientProfileState';
import { MenuItem, MenuProfileModel } from './MenuProfileModel';
import { UserData, UserProfileModel } from './UserProfileModel';

export class ClientProfileModel {
    private user: UserProfileModel;
    private menu: MenuProfileModel;

    constructor(private state: ClientProfileState) {
        this.state = state;
        this.user = new UserProfileModel(state);
        this.menu = new MenuProfileModel(state);
    }

    public updateUserData(data: UserData): ClientProfileState {
        this.state = this.user.updateUserData(data);
        return this.state;
    }

    public openMenu(): ClientProfileState {
        this.state = this.menu.openMenu();
        return this.state;
    }

    public closeMenu(): ClientProfileState {
        this.state = this.menu.closeMenu();
        return this.state;
    }

    public toggleMenu(): ClientProfileState {
        this.state = this.menu.toggleMenu();
        return this.state;
    }

    public setMenuItems(items: MenuItem[]): ClientProfileState {
        this.state = this.menu.setItems(items);
        return this.state;
    }

    public getState(): ClientProfileState {
        return this.state;
    }
}
