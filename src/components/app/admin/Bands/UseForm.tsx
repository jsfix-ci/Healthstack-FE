import {useState} from "react";

export const useForm = (callback: any,  initialState = {}) =>{
    const [values, setValues] = useState(initialState)

    const onChange = (event:React.ChangeEvent<HTMLInputElement> ) => {
        setValues({...values, [event.target.name] : event.target.name})
    }

    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(values);
    
    await callback ()
    }

    return {
       onChange,
       onSubmit,
       values,
    }
}