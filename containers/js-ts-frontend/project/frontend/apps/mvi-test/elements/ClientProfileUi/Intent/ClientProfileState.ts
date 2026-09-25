import { MenuProfileState } from '../Model/MenuProfileModel';
import { UserProfileState } from '../Model/UserProfileModel';

export interface ClientProfileState {
    user: UserProfileState;
    menu: MenuProfileState;
}
