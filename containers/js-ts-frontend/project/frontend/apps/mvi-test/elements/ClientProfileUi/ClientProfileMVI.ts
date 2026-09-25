import { ClientProfileIntent } from './Intent/ClientProfileIntent';
import { ClientProfileState } from './Intent/ClientProfileState';
import { MenuActionExecutor, MenuActionHandlers } from './MenuActionHandlers';
import { MenuProfileModel } from './Model/MenuProfileModel';
import { UserProfileModel } from './Model/UserProfileModel';

export type ClientProfileStateListener = (state: ClientProfileState) => void;

export class ClientProfileMVI {
    private state: ClientProfileState;

    private readonly userModel: UserProfileModel;
    private readonly menuModel: MenuProfileModel;
    private readonly menuActionExecutor: MenuActionExecutor;

    private readonly listeners: ClientProfileStateListener[] = [];

    constructor(initialState: ClientProfileState, menuActionHandlers: MenuActionHandlers = {}) {
        this.state = initialState;

        this.userModel = new UserProfileModel(initialState);
        this.menuModel = new MenuProfileModel(initialState);

        this.menuActionExecutor = new MenuActionExecutor(menuActionHandlers);
    }

    public dispatch(intent: ClientProfileIntent): void {
        switch (intent.type) {
            case 'openMenu':
                this.state = this.menuModel.openMenu();
                break;

            case 'closeMenu':
                this.state = this.menuModel.closeMenu();
                break;

            case 'toggleMenu':
                this.state = this.menuModel.toggleMenu();
                break;

            case 'updateUserData':
                this.state = this.userModel.updateUserData(intent.data);
                break;

            case 'menuAction':
                this.menuActionExecutor.execute(intent.action);
                break;
        }

        this.notify();
    }

    public getState(): ClientProfileState {
        return this.state;
    }

    public subscribe(listener: ClientProfileStateListener): () => void {
        this.listeners.push(listener);

        listener(this.state);

        return () => {
            const index = this.listeners.indexOf(listener);

            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
}
