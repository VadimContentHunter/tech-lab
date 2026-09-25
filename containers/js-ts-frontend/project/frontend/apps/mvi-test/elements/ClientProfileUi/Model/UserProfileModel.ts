export type Avatar = {
    type: 'image' | 'icon';
    value: string;
};

export interface UserProfileState {
    id: number;
    email: string;
    avatar: Avatar;
}

export class UserProfileModel {
    constructor(private readonly state: UserProfileState) {}

    public update(data: UserProfileState): UserProfileState {
        return {
            ...this.state,
            ...data,
        };
    }
}
