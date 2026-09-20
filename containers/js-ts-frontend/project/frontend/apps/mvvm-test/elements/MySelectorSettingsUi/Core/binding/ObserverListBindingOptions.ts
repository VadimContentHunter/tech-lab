import { Binding, BindingMode } from './interfaces/Binding';
import { ObserverList } from '../observer/ObserverList';

interface ObserverListBindingOptions<T> {
    mode: BindingMode;

    source: {
        list: ObserverList<T>;
        event: string;
    };

    target: {
        list: ObserverList<T>;
        event: string;
    };
}

export class ObserverListBinding<T> extends Binding {
    private readonly source: ObserverList<T>;
    private readonly sourceEvent: string;

    private readonly target: ObserverList<T>;
    private readonly targetEvent: string;

    public constructor({ mode, source, target }: ObserverListBindingOptions<T>) {
        super(mode);

        this.source = source.list;
        this.sourceEvent = source.event;

        this.target = target.list;
        this.targetEvent = target.event;
    }

    public bind(): void {
        this.source.addEventListener(this.sourceEvent, this.onSourceChange);

        if (this.mode === BindingMode.TwoWay) {
            this.target.addEventListener(this.targetEvent, this.onTargetChange);
        }

        this.updateTarget();
    }

    public unbind(): void {
        this.source.removeEventListener(this.sourceEvent, this.onSourceChange);

        this.target.removeEventListener(this.targetEvent, this.onTargetChange);
    }

    private readonly onSourceChange = (): void => {
        this.updateTarget();
    };

    private readonly onTargetChange = (): void => {
        this.updateSource();
    };

    private updateTarget(): void {
        this.target.items = [...this.source.items];
    }

    private updateSource(): void {
        this.source.items = [...this.target.items];
    }
}
