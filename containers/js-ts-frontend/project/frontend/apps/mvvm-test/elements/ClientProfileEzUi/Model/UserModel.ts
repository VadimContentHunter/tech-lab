import { ObservableObject } from '../ObservableObject';

export type UserDataAvatarType = 'image' | 'icon';

export interface UserData {
    id: number;
    email: string;
    avatar: {
        type: UserDataAvatarType;
        value: string;
    };
}

export class UserModel extends ObservableObject {
    public static readonly events = {
        dataUserChanged: 'dataUserChanged',
    } as const;

    private data: UserData;

    constructor(data: UserData) {
        super();
        this.data = data;
    }

    public update(data: UserData): void {
        this.data = data;
        this.onPropertyChanged(UserModel.events.dataUserChanged);
    }

    public getData(): UserData {
        return this.data;
    }
}
