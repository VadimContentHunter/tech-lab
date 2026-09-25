import { MenuAction } from '../Model/MenuProfileModel';
import { UserData } from '../Model/UserProfileModel';

export type ClientProfileIntent =
    | { type: 'openMenu' }
    | { type: 'closeMenu' }
    | { type: 'toggleMenu' }
    | { type: 'updateUserData'; data: UserData }
    | { type: 'menuAction'; action: MenuAction };
