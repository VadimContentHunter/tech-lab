import { ClientProfileIntent } from './Intent/ClientProfileIntent';
import { ClientProfileState } from './Intent/ClientProfileState';
import { MenuAction, MenuProfileModel } from './Model/MenuProfileModel';
import { UserProfileModel } from './Model/UserProfileModel';
import { ClientProfileView, ClientProfileViewEvents } from './View/ClientProfileView';

export class ClientProfileUi {
    private state: ClientProfileState;

    private readonly userModel: UserProfileModel;
    private readonly menuModel: MenuProfileModel;
    private readonly view: ClientProfileView;

    constructor(
        initialState: ClientProfileState,
        private handleAction: (action: MenuAction) => void
    ) {
        this.state = initialState;

        this.userModel = new UserProfileModel(initialState.user);
        this.menuModel = new MenuProfileModel(initialState.menu);

        this.view = new ClientProfileView(this.createViewEvents());
    }

    private createViewEvents(): ClientProfileViewEvents {
        return {
            profileClicked: () =>
                this.dispatch({
                    type: 'profileClicked',
                }),

            outsideClicked: () =>
                this.dispatch({
                    type: 'outsideClicked',
                }),

            menuAction: (action) =>
                this.dispatch({
                    type: 'menuAction',
                    action,
                }),
        };
    }

    public dispatch(intent: ClientProfileIntent): void {
        switch (intent.type) {
            case 'profileClicked':
                this.state = {
                    ...this.state,
                    menu: this.menuModel.toggleMenu(),
                };
                break;

            case 'outsideClicked':
                this.state = {
                    ...this.state,
                    menu: this.menuModel.closeMenu(),
                };
                break;

            case 'menuAction':
                this.handleAction(intent.action);
                this.state = {
                    ...this.state,
                    menu: this.menuModel.closeMenu(),
                };
                break;
        }

        this.view.render(this.state);
    }

    public getState(): ClientProfileState {
        return this.state;
    }

    public getElement(): HTMLElement {
        return this.view.getElement();
    }

    public renderTo(container: Element): void {
        this.view.render(this.state);
        container.replaceChildren(this.getElement());
    }
}
