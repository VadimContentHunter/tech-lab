import { ListBinding } from './ListBinding';
import { BindingMode } from './Binding';
import { ObserverList } from '../observer/ObserverList';

interface ObserverListBindingOptions<T> {
    mode: BindingMode;
    source: ObserverList<T>;
    target: ObserverList<T>;
    sourceEvent?: string;
    targetEvent?: string;
}

export class ObserverListBinding<T> extends ListBinding {
    private readonly source: ObserverList<T>;
    private readonly target: ObserverList<T>;
    private readonly sourceEvent: string;
    private readonly targetEvent: string;

    public constructor({ mode, source, target, sourceEvent = 'change', targetEvent = 'change' }: ObserverListBindingOptions<T>) {
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
        this.updateSource();
    };

    private updateTarget(): void {
        this.target.items = [...this.source.items];
    }

    private updateSource(): void {
        this.source.items = [...this.target.items];
    }
}
