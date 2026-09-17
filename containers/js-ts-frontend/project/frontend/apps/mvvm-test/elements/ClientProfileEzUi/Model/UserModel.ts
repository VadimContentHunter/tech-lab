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
        if (
            this.data.id === data.id &&
            this.data.email === data.email &&
            this.data.avatar.type === data.avatar.type &&
            this.data.avatar.value === data.avatar.value
        ) {
            return;
        }

        this.data = data;
        this.onPropertyChanged(UserModel.events.dataUserChanged);
    }

    public getData(): UserData {
        return this.data;
    }
}
