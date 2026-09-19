import { ListBinding } from './ListBinding';
import { BindingMode } from './Binding';
import { ObserverList } from '../observer/ObserverList';

interface HTMLCollectionBindingOptions<T extends Element> {
    mode: BindingMode;
    source: ObserverList<T>;
    collection: HTMLCollection;
}

export class HTMLCollectionBinding<T extends Element> extends ListBinding {
    private readonly source: ObserverList<T>;
    private readonly collection: HTMLCollection;
    private readonly observer: MutationObserver;

    public constructor({ mode, source, collection }: HTMLCollectionBindingOptions<T>) {
        super(mode);

        this.source = source;
        this.collection = collection;

        this.observer = new MutationObserver(this.onCollectionChange);
    }

    public bind(): void {
        const parent = this.collection[0]?.parentElement;

        if (parent !== null && parent !== undefined) {
            this.observer.observe(parent, {
                childList: true,
            });
        }

        this.updateSource();
    }

    public unbind(): void {
        this.observer.disconnect();
    }

    private readonly onCollectionChange = (): void => {
        if (this.mode === BindingMode.TwoWay) {
            this.updateSource();
        }
    };

    private updateSource(): void {
        this.source.items = Array.from(this.collection) as T[];
    }
}
