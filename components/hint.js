import React, { useCallback } from 'react';

const Hint = (props) => {
    const { hint, onHintClick } = props;

    const onClick = useCallback(() => {
        const prompts = hint.prompts;
        const random = Math.round(Math.random() * 1000);

        onHintClick(prompts[random % prompts.length]);
    }, [hint]);

    return (
        <button onClick={onClick} className="prompt-hint">{hint.label}</button>
    )
}

export default React.memo(Hint);
