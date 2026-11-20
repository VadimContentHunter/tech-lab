import { CSSProperties, useRef, useState } from 'react';

function CastInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const containerStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    const inputStyle: CSSProperties = isFocused
        ? {
              padding: '8px',
              border: '2px solid #1976d2',
              borderRadius: '4px',
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.25)',
          }
        : {
              padding: '8px',
              border: '2px solid #bdbdbd',
              borderRadius: '4px',
              outline: 'none',
              boxShadow: 'none',
          };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const blurInput = () => {
        inputRef.current?.blur();
    };

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div style={containerStyle}>
            <input type="text" ref={inputRef} style={inputStyle} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
            <button onClick={focusInput}>Focus</button>
            <button onClick={blurInput}>Blur</button>
            <button onClick={clearInput}>Clear</button>
        </div>
    );
}

export default CastInput;
