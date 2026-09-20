import { Binding, BindingMode } from './Binding';

export abstract class ListBinding extends Binding {
    protected constructor(mode: BindingMode) {
        super(mode);
    }
}
