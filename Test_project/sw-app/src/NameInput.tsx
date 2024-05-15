import { useInput } from 'react-admin';

const NameInput = ({ source, label }) => {
    const { id, field, fieldState } = useInput({ source });

    const handleChange = (event) => {
        // Update the field value with the user input
        field.onChange( { contains: event.target.value  });
    };

    return (
        <label htmlFor={id}>
            {label}
            <input id={id} type="text" value={event.target.value} onChange={handleChange} />
            {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
    );
    };

export default NameInput;