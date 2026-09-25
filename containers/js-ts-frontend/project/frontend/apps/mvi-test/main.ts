import { ClientProfileUi } from './elements/ClientProfileUi/ClientProfileUi';
import { ClientProfileState } from './elements/ClientProfileUi/Intent/ClientProfileState';

const app = document.getElementById('app');
if (!app) {
    throw new Error('Application root element "#app" was not found.');
}

new ClientProfileUi(
    {
        user: {
            id: 1,
            email: 'ivan@example.com',
            avatar: {
                type: 'icon',
                value: 'fa-solid fa-circle-user',
            },
        },
        menu: {
            isOpen: false,
            menuItems: [
                { title: 'Edit profile', action: 'editProfile' },
                { title: 'Change avatar', action: 'changeAvatar' },
                { title: 'Log out', action: 'logout' },
            ],
        },
    },
    (action) => {
        switch (action) {
            case 'editProfile':
                alert('Edit profile');
                break;

            case 'changeAvatar':
                alert('Change avatar');
                break;

            case 'logout':
                alert('Logout');
                break;

            case 'none':
                break;
        }
    }
).renderTo(app);
