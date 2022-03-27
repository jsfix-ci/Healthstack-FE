import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/buttons/Button";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import Input from "../../components/inputs/basic/Input";
import PasswordInput from "../../components/inputs/basic/Password";
import { UserContext } from "../../context/context";
import client from "../../feathers";
import AuthWrapper from "../../helper/AuthWrapper";


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();


function Login() {
  const navigate = useNavigate();
  const { control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { setUser } = useContext(UserContext);
  


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    document.title = 'Health Stack - Logi';
  }, []);

  const onSubmit = ({ email, password }) => {
    client
      .authenticate({
        strategy: 'local',
        email,
        password,
      })
      .then((res) => {
        setUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate("/app");
      })
      .catch((err) => {
        toast.error(`Error loggin in User, probable network issues ${err}`);
        navigate('/app');
      });
  };

  return (
    <AuthWrapper paragraph="Login here as an organization">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input {...field} 
              label="Email" 
              placeholder="Enter your email" 
            />
          )}
        />
        {
          errors.email && (
            <p style={{color: 'blue', fontSize: '16px' }}>{errors.email?.message}</p>
          )
        }

        <Controller
          name='password'
          control={control}
          render={({ field }) => <PasswordInput {...field} />}
        />

        {
          errors.password && (
            <p style={{color: 'blue', fontSize: '16px' }}>{errors.password?.message}</p>
          )
        }

        <CheckboxInput label="Keep me Logged in" />
        <Button type="submit" label="Login" fullwidth />
      </form>

      <div className="bottom-center">
        <p>or continue with</p>
        <a href="">
          <i className="bi bi-google" />
        </a>
        <a href="">
          <i className="bi bi-facebook" />
        </a>
        <a href="">
          <i className="bi bi-linkedin" />
        </a>

        <p>
          Want to create organization?
          <Link
            className="nav-link"
            style={{
              padding: '0',
              background: 'transparent',
              color: 'blue',
              marginLeft: '0.6rem',
            }}
            to="/signup"
          >
            Click here
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}

export default Login;
