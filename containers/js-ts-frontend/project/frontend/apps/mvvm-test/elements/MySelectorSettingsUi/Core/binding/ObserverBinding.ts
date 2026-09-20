import { Binding, BindingMode } from './interfaces/Binding';
import { ObserverProperty } from '../observer/ObserverProperty';

interface ObserverBindingOptions<T> {
    mode: BindingMode;

    source: {
        observer: ObserverProperty<T>;
        event: string;
    };

    target: {
        observer: ObserverProperty<T>;
        event: string;
    };
}

export class ObserverBinding<T> extends Binding {
    private readonly source: ObserverProperty<T>;
    private readonly sourceEvent: string;

    private readonly target: ObserverProperty<T>;
    private readonly targetEvent: string;

    public constructor({ mode, source, target }: ObserverBindingOptions<T>) {
        super(mode);

        this.source = source.observer;
        this.sourceEvent = source.event;

        this.target = target.observer;
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
        this.target.value = this.source.value;
    }

    private updateSource(): void {
        this.source.value = this.target.value;
    }
}
