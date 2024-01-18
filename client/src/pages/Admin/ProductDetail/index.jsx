import React from 'react'
import { useParams } from "react-router-dom";
import { fetchProduct, updateProducts } from "../../../api";
import { useQuery } from "react-query";
import { Flex, Spinner, Heading, Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import editSchema from "./validations";
import { message } from "antd";
function ProductDetail() {
    const { product_id } = useParams();
    const { isLoading, isError, data, error } = useQuery(['admin:product', product_id], () => fetchProduct(product_id));

    if (isLoading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" size='xl' color="purple.200" />
            </Flex>
        )
    }
    if (isError) {
        return <div>Erorr {error.message}</div>
    }

    const handleSubmit = async (values, bag) => {
        message.loading({content: "Loading...", key: 'product_update'});
        try {
            await updateProducts(values, product_id);
            message.success({
                content: "The product succesfully update",
                key: 'product_update',
                duration: 2
            })
        } catch (e) {
            message.error('The product does not update')
        }
    }
    console.log(data)
    return (
        <div id='content'>
            <Heading as='h2'>Edit</Heading>
            <Formik
                initialValues={{
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    photos: data.photos
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
                                            Update
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

export default ProductDetail