import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    //useState del form
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : ""
    });

    const navigate = useNavigate(); // para redireccionar al login

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', formData);
            alert('Usuario creado correctamente');
            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    };

  return (
    <>
        <h2>REGISTER</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
                <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                <button type='submit'>Register</button>
            </form>
        </div>
    </>
  )
}

export default Register
