import React from 'react'
import { PostProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import { Heading, Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import editSchema from "./validations";
import { message } from "antd";
function NewProduct() {
    const queryClient = useQueryClient();
    const NewProductMutation = useMutation(PostProduct, {
        onSuccess: () => queryClient.invalidateQueries('admin:products')
    });

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: 'product_save' });
        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }
        NewProductMutation.mutate(newValues, {
            onSuccess: () => {
                message.success({
                    content: "The product succesfully save",
                    key: 'product_save',
                    duration: 2
                })
            }
        })
    }
    return (
        <div id='content'>
            <Heading as='h2'>New Product</Heading>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    photos: []
                }}
                validationSchema={editSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({
                        handleSubmit,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        values,
                        isSubmitting }) => (
                        <>
                            <Box>
                                <Box my='4' textAlign='left'>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name='title'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title} />
                                        </FormControl>
                                        <FormControl mt='4'>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name='description'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && errors.description} />
                                        </FormControl>
                                        <FormControl mt='4'>
                                            <FormLabel>Price</FormLabel>
                                            <Input
                                                name='price'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.price && errors.price} />
                                        </FormControl>
                                        <FormControl mt='4'>
                                            <FormLabel>Photos</FormLabel>
                                            <FieldArray
                                                name='photos'
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {
                                                            values.photos && values.photos.map((photo, index) => (
                                                                <div key={index} style={{ display: 'flex' }}>
                                                                    <Input
                                                                        mb='4'
                                                                        name={`photos.${index}`}
                                                                        value={photo}
                                                                        disabled={isSubmitting}
                                                                        onChange={handleChange} />
                                                                    <Button
                                                                        ml='4'
                                                                        type='button'
                                                                        colorScheme='red'
                                                                        onClick={() => arrayHelpers.remove(index)}>
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        }
                                                        <Button colorScheme='green' onClick={() => arrayHelpers.push('')}>Add a photo</Button>
                                                    </div>
                                                )} />
                                        </FormControl>

                                        <Button colorScheme='purple' mt='4' width='full' type='submit' isLoading={isSubmitting}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                    )
                }
            </Formik>
        </div>
    )
}

export default NewProduct