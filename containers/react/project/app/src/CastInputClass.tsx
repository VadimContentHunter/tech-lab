import React, { createRef } from 'react';

class CastInputClass extends React.Component {
    override state = {
        isFocused: false,
    };

    inputRef = createRef<HTMLInputElement>();

    focusInput = () => {
        this.inputRef.current?.focus();
    };

    override render() {
        return (
            <>
                <input ref={this.inputRef} />
                <button onClick={this.focusInput}>Focus</button>
            </>
        );
    }
}

export default CastInputClass;
