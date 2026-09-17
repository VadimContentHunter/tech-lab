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
            title: 'Посмотреть профиль',
            action: () => console.log('Посмотреть профиль'),
        },
        {
            title: 'Выйти',
            action: () => console.log('Выйти'),
        },
    ],
});

const viewModel = new ClientProfileEzViewModel(userModel, menuModel);
const view = new ClientProfileView(viewModel);
const demoStage = document.querySelector<HTMLElement>('.demo-card__stage');

if (!demoStage) {
    throw new Error('Element not found: .demo-card__stage');
}

demoStage.append(view.getElement());
