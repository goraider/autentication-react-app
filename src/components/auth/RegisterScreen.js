import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from "react-redux";
import { setError } from '../../actions/ui';

import validator from 'validator';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
            name:  'Gosain',
            email: 'agosain@gmail.com',
            password: '123456',
            password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log( name, email, password, password2 );

        if( isFormValid() ){
            console.log('Formulario correcto');

        }

    }

    const isFormValid = () => {

        if( name.trim().length === 0 ){
            dispatch(setError('Nmae is required') )
            return false;
        } else if ( !validator.isEmail( email ) ){
            dispatch(setError('Email is not valid'));
            return false;            
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch(setError('Password Should'));
            return false;
        }

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                    autoComplete="off"
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                    autoComplete="off"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
