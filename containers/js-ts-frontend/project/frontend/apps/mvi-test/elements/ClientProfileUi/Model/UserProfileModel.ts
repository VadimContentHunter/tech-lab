import { Avatar, ClientProfileState } from '../Intent/ClientProfileState';

export interface UserData {
    id: number;
    email: string;
    avatar: Avatar;
}

export class UserProfileModel {
    private userData: UserData;

    constructor(private state: ClientProfileState) {
        this.userData = {
            id: state.id,
            email: state.email,
            avatar: state.avatar,
        };
    }

    public updateUserData(data: UserData): ClientProfileState {
        this.userData = data;

        return {
            ...this.state,
            id: data.id,
            email: data.email,
            avatar: data.avatar,
        };
    }

    public getUserData(): UserData {
        return this.userData;
    }
}
