import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        if(word==="danger"){
            word="error";
        }
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:"20px"}} className='mt-2'>
            {
                props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show container`} role="alert">
                    <strong>{capitalize(props.alert.type)}: {props.alert.msg}</strong>
                </div>
            }
        </div>
    )
}

export default Alert;