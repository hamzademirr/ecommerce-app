import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                const registerResponse = await fetchRegister({
                    email: values.email,
                    password: values.password
                });
                login(registerResponse);
                navigate('/profile')
            } catch (error) {
                bag.setErrors({ general: error.response.data.message });
            }
        }
    });
    return (
        <div>
            <Flex align='center' width='full' justifyContent='center'>
                <Box pt='8'>
                    <Box textAlign='center'>
                        <Heading>Register</Heading>
                    </Box>
                    <Box my='4'>
                        {
                            formik.errors.general && (
                                <Alert status='error'>
                                    {formik.errors.general}
                                </Alert>
                            )
                        }
                    </Box>
                    <Box my='4' textAlign='left'>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email} />
                            </FormControl>
                            <FormControl mt='4'>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name='password'
                                    type='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password} />
                            </FormControl>
                            <FormControl mt='4'>
                                <FormLabel>Password Confirme</FormLabel>
                                <Input
                                    name='passwordConfirm'
                                    type='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordConfirm}
                                    isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm} />
                            </FormControl>
                            <Button mt='4' width='full' type='submit' colorScheme='purple'>Register</Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </div>
    );
}

export default Register