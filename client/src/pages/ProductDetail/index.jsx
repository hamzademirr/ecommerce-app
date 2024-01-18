import React from 'react'
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from '../../api';
import { Box, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import moment from 'moment';
import ImageGallery from "react-image-gallery";
import { useBasket } from '../../context/BasketContext';

function ProductDetail() {
    const { product_id } = useParams();
    const { addToBasket, items } = useBasket();

    const { isLoading, error, data } = useQuery(["product", product_id], () =>
        fetchProduct(product_id)
    );
    if (isLoading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" size='xl' color="purple.200" />
            </Flex>
        );
    }
    if (error) {
        return <h1>{error.message}</h1>
    }

    const images = data.photos.map((url) => ({ original: url }));
    const findBasketItem = items.find((item) => item._id === product_id);
    return (
        <div id='content'>
            <Button colorScheme={findBasketItem ? 'pink' : 'purple'} onClick={() => addToBasket(data, findBasketItem)}>
                {findBasketItem ? 'Remove from basket' : 'Add to Basket'}
            </Button>
            <Text as='h2' fontSize='2xl'>{data.title}</Text>
            <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
            <Text>{data.description}</Text>
            <Box>
                <ImageGallery showPlayButton={false} items={images} />
            </Box>
        </div>
    )
}

export default ProductDetail