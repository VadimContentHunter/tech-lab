import { MenuModel } from './elements/ClientProfileEzUi/Model/MenuModel';
import { UserModel } from './elements/ClientProfileEzUi/Model/UserModel';
import { ClientProfileEzViewModel } from './elements/ClientProfileEzUi/ViewModel/ClientProfileEzViewModel';
import { ClientProfileView } from './elements/ClientProfileEzUi/View/ClientProfileEzUiView';
import { ObserverProperty } from './elements/MySelectorSettingsUi/Core/observer/ObserverProperty';
import { BindingParser } from './elements/MySelectorSettingsUi/Core/render/BindingParser';
import { ViewRender } from './elements/MySelectorSettingsUi/Core/render/ViewRender';
import { BindingBuilderRegistry } from './elements/MySelectorSettingsUi/Core/render/repositories/BindingBuilderRegistry';
import { BindingStrategyRegistry } from './elements/MySelectorSettingsUi/Core/render/repositories/BindingStrategyRegistry';
import { HTMLElementBindingBuilder } from './elements/MySelectorSettingsUi/Core/render/builders/HTMLElementBindingBuilder';

const userModel = new UserModel({
    id: 1,
    email: 'ivan@example.com',
    avatar: { type: 'icon', value: 'fa-solid fa-circle-user' },
});

const menuModel = new MenuModel({
    items: [
        {
            title: 'Посмотреть профиль',
            action: () => alert('Посмотреть профиль'),
        },
        {
            title: 'Выйти',
            action: () => alert('Выйти'),
        },
    ],
});

const viewModel = new ClientProfileEzViewModel(userModel, menuModel);
const profileView = new ClientProfileView(viewModel);

// Контейнер
const demoStage = document.querySelector<HTMLElement>('.demo-card__stage');
if (!demoStage) {
    throw new Error('Element not found: .demo-card__stage');
}
demoStage.append(profileView.getElement());

// --------------------------------

const context = {
    Title: new ObserverProperty('Hello'),
};

const builders = new BindingBuilderRegistry();
builders.register('HTMLElementBinding', new HTMLElementBindingBuilder(new BindingStrategyRegistry()));

const view = new ViewRender(new BindingParser(builders), context);
const element = view.render(`
    <div class="binding-demo">
        <label>
            Первое поле
            <input
                binding="HTMLElementBinding"
                binding-param="property:value mode:two-way event:input target.prop:Title target.event:change"
            >
        </label>
        <label>
            Второе поле
            <input
                binding="HTMLElementBinding"
                binding-param="property:value mode:two-way event:input target.prop:Title target.event:change"
            >
        </label>
    </div>
`);

// Контейнер
const bindingStage = document.querySelector<HTMLElement>('#binding-demo-stage');
if (!bindingStage) {
    throw new Error('Element not found: #binding-demo-stage');
}
bindingStage.append(element);
