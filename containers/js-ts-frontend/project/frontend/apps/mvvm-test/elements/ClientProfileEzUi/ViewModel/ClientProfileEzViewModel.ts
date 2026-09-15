import { MenuModel, type MenuItem } from '../Model/MenuModel';
import { UserDataAvatarType, UserModel, type UserData } from '../Model/UserModel';
import { ObservableObject } from '../ObservableObject';
import { ClientProfileView } from '../View/ClientProfileEzUiView';

/**
 * Todo: Решить вопрос с onPropertyChanged, хотелось бы сделать защиту от цикличных вызовов.
 * Решить вопрос с handler... с параметром event. (если надо будет после изменения onPropertyChanged)
 */
export class ClientProfileEzViewModel extends ObservableObject {
    public static readonly events = {
        idChanged: 'idChanged',
        emailChanged: 'emailChanged',
        avatarTypeChanged: 'avatarTypeChanged',
        avatarChanged: 'avatarChanged',
        menuItemsChanged: 'menuItemsChanged',
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

        // Подписка на события изменения свойств ViewModel
        this.addEventListener(ClientProfileEzViewModel.events.idChanged, this.handlerUpdateForUserModel);
        this.addEventListener(ClientProfileEzViewModel.events.emailChanged, this.handlerUpdateForUserModel);
        this.addEventListener(ClientProfileEzViewModel.events.avatarTypeChanged, this.handlerUpdateForUserModel);
        this.addEventListener(ClientProfileEzViewModel.events.avatarChanged, this.handlerUpdateForUserModel);
        this.addEventListener(ClientProfileEzViewModel.events.menuItemsChanged, this.handlerUpdateForMenuModel);

        // Подписка на события изменения внешних моделей
        this.userModel.addEventListener(UserModel.events.dataUserChanged, this.handlerUpdateFromUserModel);
        this.menuModel.addEventListener(MenuModel.events.itemsMenuChanged, this.handlerUpdateMenuItemsFromMenuModel);
    }

    /* Getters and Setters */

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        if (this._id === value) return;
        this._id = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.idChanged);
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (this._email === value) return;
        this._email = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.emailChanged);
    }

    public get avatarType(): UserDataAvatarType {
        return this._avatarType;
    }

    public set avatarType(value: UserDataAvatarType) {
        if (this._avatarType === value) return;
        this._avatarType = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.avatarTypeChanged);
    }

    public get avatar(): string {
        return this._avatar;
    }

    public set avatar(value: string) {
        if (this._avatar === value) return;
        this._avatar = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.avatarChanged);
    }

    public get menuItems(): MenuItem[] {
        return this._menuItems;
    }

    public set menuItems(value: MenuItem[]) {
        this._menuItems = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.menuItemsChanged);
    }

    public get isMenuOpen(): boolean {
        return this._isMenuOpen;
    }

    public set isMenuOpen(value: boolean) {
        this._isMenuOpen = value;
        this.onPropertyChanged(ClientProfileEzViewModel.events.isMenuOpenChanged);
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        this.onPropertyChanged(ClientProfileEzViewModel.events.isMenuOpenChanged);
    }

    /* Other methods */

    public handlerUpdateFromUserModel(event?: CustomEvent): void {
        const data = this.userModel.getData();

        this.id = data.id;
        this.email = data.email;
        this.avatarType = data.avatar.type;
        this.avatar = data.avatar.value;
    }

    public handlerUpdateForUserModel(event?: CustomEvent): void {
        const data = { ...this.userModel.getData() };
        data.id = this.id;
        data.email = this.email;
        data.avatar.type = this.avatarType;
        data.avatar.value = this.avatar;

        this.userModel.update(data);
    }

    public handlerUpdateMenuItemsFromMenuModel(event?: CustomEvent): void {
        this.menuItems = this.menuModel.getItems();
    }

    public handlerUpdateForMenuModel(event?: CustomEvent): void {
        this.menuModel.setItems(this.menuItems);
    }
}
