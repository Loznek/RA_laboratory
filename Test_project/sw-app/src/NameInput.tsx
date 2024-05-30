import { useInput } from 'react-admin';

const NameInput = ({ source, label }) => {
    const { id, field, fieldState } = useInput({ source });

    const handleChange = (event) => {
        // Update the field value with the user input
        field.onChange( { contains: event.target.value  });
    };

    return (
        <label htmlFor={id} style={{marginBottom:'12pt' }}>
            {label}
            <input id={id} type="text" value={event.target.value} onChange={handleChange} style={{marginBottom:'0pt',marginLeft:'15pt',marginRight:'4pt'  }} />
            {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
    );
    };

export default NameInput;