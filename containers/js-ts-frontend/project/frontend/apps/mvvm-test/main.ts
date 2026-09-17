import { MenuModel } from './elements/ClientProfileEzUi/Model/MenuModel';
import { UserModel } from './elements/ClientProfileEzUi/Model/UserModel';
import { ClientProfileEzViewModel } from './elements/ClientProfileEzUi/ViewModel/ClientProfileEzViewModel';
import { ClientProfileView } from './elements/ClientProfileEzUi/View/ClientProfileEzUiView';

const userModel = new UserModel({
    id: 1,
    email: 'ivan@example.com',
    avatar: { type: 'icon', value: 'fa-solid fa-circle-user' },
});

const menuModel = new MenuModel({
    items: [
        {
            title: 'View profile',
            action: () => console.log('View profile'),
        },
        {
            title: 'Sign out',
            action: () => console.log('Sign out'),
        },
    ],
});

const viewModel = new ClientProfileEzViewModel(userModel, menuModel);
const view = new ClientProfileView(viewModel);
const app = document.querySelector<HTMLElement>('#app');

if (!app) {
    throw new Error('Element not found: #app');
}

app.append(view.getElement());
