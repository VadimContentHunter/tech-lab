export interface UserData {
    id: number;
    email: string;
    avatar: {
        type: 'image' | 'icon';
        value: string;
    };
}

export class UserModel {
    private data: UserData;

    constructor(data: UserData) {
        this.data = data;
    }

    public update(data: UserData): void {
        this.data = data;
    }

    public getData(): UserData {
        return this.data;
    }
}
