import { HTMLElementBinding } from '../../binding/HTMLElementBinding';
import { BindingMode } from '../../binding/interfaces/IBinding';
import { ObserverProperty } from '../../observer/ObserverProperty';
import { BindingBuilder } from '../interfaces/BindingBuilder';
import { BindingBuilderContext } from '../interfaces/IBindingStrategy';

export class HTMLElementBindingBuilder<T> extends BindingBuilder<HTMLElementBinding<T>> {
    protected create(context: BindingBuilderContext): HTMLElementBinding<T> {
        const property = context.parameters.get('property');
        const mode = context.parameters.get('mode') ?? 'one-way';
        const elementEvent = context.parameters.get('event');

        const targetProperty = context.parameters.get('target.prop');
        const targetEvent = context.parameters.get('target.event');

        if (!property) {
            throw new Error('HTMLElementBinding requires "property" parameter.');
        }

        if (!targetProperty) {
            throw new Error('HTMLElementBinding requires "target.prop" parameter.');
        }

        if (!context.context) {
            throw new Error('HTMLElementBinding requires a context.');
        }

        const observer = (context.context as Record<string, unknown>)[targetProperty];
        if (!(observer instanceof ObserverProperty)) {
            throw new Error(`Context property "${targetProperty}" must be an ObserverProperty.`);
        }

        const bindingMode = this.parseMode(mode);
        if (bindingMode === BindingMode.TwoWay && !elementEvent) {
            throw new Error('HTMLElementBinding in TwoWay mode requires "event" parameter.');
        }

        if (!targetEvent) {
            throw new Error('HTMLElementBinding requires "target.event" parameter.');
        }

        const source = {
            element: context.element,
            property,
            ...(elementEvent !== undefined ? { event: elementEvent } : {}),
        };

        return new HTMLElementBinding<T>({
            mode: bindingMode,
            source,
            target: {
                observer: observer as ObserverProperty<T>,
                event: targetEvent,
            },
        });
    }

    private parseMode(mode: string): BindingMode {
        switch (mode) {
            case 'one-way':
                return BindingMode.OneWay;

            case 'two-way':
                return BindingMode.TwoWay;

            default:
                throw new Error(`Unknown HTMLElementBinding mode "${mode}".`);
        }
    }
}
