import React from 'react';
import style from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props} className={style.my__input} type="text">
        </input>
    );
});

export default MyInput;