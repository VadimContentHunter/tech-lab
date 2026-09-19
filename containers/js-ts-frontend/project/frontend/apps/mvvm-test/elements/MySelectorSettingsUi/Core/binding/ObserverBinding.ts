import { Binding, BindingMode } from './Binding';
import { ObserverProperty } from '../observer/ObserverProperty';

interface ObserverBindingOptions<T> {
    mode: BindingMode;
    source: ObserverProperty<T>;
    target: ObserverProperty<T>;
    sourceEvent?: string;
    targetEvent?: string;
}

export class ObserverBinding<T> extends Binding {
    private readonly source: ObserverProperty<T>;
    private readonly target: ObserverProperty<T>;
    private readonly sourceEvent: string;
    private readonly targetEvent: string;

    public constructor({ mode, source, target, sourceEvent = 'change', targetEvent = 'change' }: ObserverBindingOptions<T>) {
        super(mode);

        this.source = source;
        this.target = target;
        this.sourceEvent = sourceEvent;
        this.targetEvent = targetEvent;
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
        this.source.value = this.target.value;
    };

    private updateTarget(): void {
        this.target.value = this.source.value;
    }
}
