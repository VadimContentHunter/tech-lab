import { MenuModel } from './elements/ClientProfileUi/Model/MenuModel';
import { UserModel } from './elements/ClientProfileUi/Model/UserModel';
import { ClientProfilePresenter } from './elements/ClientProfileUi/Presenter/ClientProfilePresenter';
import { ClientProfileView } from './elements/ClientProfileUi/View/ClientProfileView';

const user = new UserModel({
    id: 1,
    email: 'ivan@example.com',
    avatar: { type: 'icon', value: 'fa-solid fa-circle-user' },
});
const menu = new MenuModel({
    isOpen: false,
    items: [
        {
            title: 'View profile',
            action: () => alert('View profile'),
        },
        {
            title: 'Sign out',
            action: () => alert('Sign out'),
        },
    ],
});
const view = new ClientProfileView();
const presenter = new ClientProfilePresenter(user, menu, view);
presenter.renderTo('#app');
