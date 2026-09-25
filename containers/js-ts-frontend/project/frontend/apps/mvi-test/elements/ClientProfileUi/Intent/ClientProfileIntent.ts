import { MenuAction } from '../Model/MenuProfileModel';

export type ClientProfileIntent = { type: 'profileClicked' } | { type: 'outsideClicked' } | { type: 'menuAction'; action: MenuAction };
