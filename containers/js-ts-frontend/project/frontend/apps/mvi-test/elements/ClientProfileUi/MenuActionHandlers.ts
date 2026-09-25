import { MenuAction } from './Model/MenuProfileModel';

export type MenuActionHandler = () => void;

export type MenuActionHandlers = Partial<Record<MenuAction, MenuActionHandler>>;

export class MenuActionExecutor {
    constructor(private readonly handlers: MenuActionHandlers = {}) {}

    public execute(action: MenuAction): void {
        if (action === 'none') {
            return;
        }

        this.handlers[action]?.();
    }
}
