import React from 'react'
import { Grid, Box, Button, Flex, Spinner } from '@chakra-ui/react'
import { useInfiniteQuery } from "react-query";
import Card from '../../components/Card'
import { fetchProductList } from '../../api';

function Products() {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery("products", fetchProductList, {
        getNextPageParam: (lastGroup, allGroups) => {
            const morePagesExist = lastGroup?.length === 12;

            if (!morePagesExist) {
                return;
            } else {
                return allGroups.length + 1;
            }
        },
    });

    if (status === 'loading') {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" size='xl' color="purple.200" />
            </Flex>
        );
    }
    if (status === 'error') {
        return <h1>{error.message}</h1>
    }
    return (
        <div id='content'>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {
                    data.pages.map((group, key) => (
                        <React.Fragment key={key}>
                            {
                                group.map((item) => (
                                    <Box w='100%' key={item._id}>
                                        <Card item={item} />
                                    </Box>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>

            <Flex m='10' justifyContent='center'>
                <Button
                    onClick={() => fetchNextPage()}
                    isLoading={isFetchingNextPage}
                    isDisabled={!hasNextPage || isFetchingNextPage}
                    colorScheme='purple'>
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>
        </div>
    )
}

export default Products