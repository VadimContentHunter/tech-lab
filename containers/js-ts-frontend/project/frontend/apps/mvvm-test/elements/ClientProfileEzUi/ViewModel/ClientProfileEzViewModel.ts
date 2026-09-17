import { MenuModel, type MenuItem } from '../Model/MenuModel';
import { UserDataAvatarType, UserModel } from '../Model/UserModel';
import { ObservableObject } from '../ObservableObject';

export class ClientProfileEzViewModel extends ObservableObject {
    public static readonly events = {
        isMenuOpenChanged: 'isMenuOpenChanged',
    } as const;

    private _id = 0;
    private _email = '';
    private _avatarType: UserDataAvatarType = 'icon';
    private _avatar = '';
    private _menuItems: MenuItem[] = [];
    private _isMenuOpen = false;

    constructor(
        private readonly userModel: UserModel,
        private readonly menuModel: MenuModel
    ) {
        super();

        // Инициализация ViewModel с данными из моделей
        this.handlerUpdateFromUserModel();
        this.handlerUpdateMenuItemsFromMenuModel();

        // Подписка на события изменения внешних моделей
        this.userModel.addEventListener(UserModel.events.dataUserChanged, this.handlerUpdateFromUserModel);
        this.menuModel.addEventListener(MenuModel.events.itemsMenuChanged, this.handlerUpdateMenuItemsFromMenuModel);
    }

    /* Getters */

    public get id(): number {
        return this._id;
    }

    public get email(): string {
        return this._email;
    }

    public get avatarType(): UserDataAvatarType {
        return this._avatarType;
    }

    public get avatar(): string {
        return this._avatar;
    }

    public get menuItems(): MenuItem[] {
        return this._menuItems;
    }

    public get isMenuOpen(): boolean {
        return this._isMenuOpen;
    }

    /* View handlers */

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    public openMenu(): void {
        this.isMenuOpen = true;
    }

    public closeMenu(): void {
        this.isMenuOpen = false;
    }

    public menuItemClick(item: MenuItem): void {
        item.action();
    }

    /* State */

    private set isMenuOpen(value: boolean) {
        if (this._isMenuOpen === value) return;

        this._isMenuOpen = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.isMenuOpenChanged);
    }

    /* Model handlers */

    public handlerUpdateFromUserModel(): void {
        const data = this.userModel.getData();

        this._id = data.id;
        this._email = data.email;
        this._avatarType = data.avatar.type;
        this._avatar = data.avatar.value;
    }

    public handlerUpdateMenuItemsFromMenuModel(): void {
        const items = this.menuModel.getItems();

        if (this._menuItems === items) return;

        this._menuItems = items;
    }
}
