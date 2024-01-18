import React, { useState } from 'react'
import { useBasket } from '../../context/BasketContext'
import {
    Alert,
    Box,
    Button,
    Grid,
    Heading,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    FormControl,
    Textarea
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { postOrder } from '../../api';

function Basket() {
    const { items, removeFromBasket, emptyBasket } = useBasket();
    const total = items.reduce((acc, obj) => acc + obj.price, 0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [address, setAddress] = useState();
    const handleSubmitForm = async () => {
        const itemIds = items.map((item) => item._id);

        const input = {
            address,
            items: JSON.stringify(itemIds)
        }

        await postOrder(input);
        emptyBasket();
        onClose();
    }

    return (
        <div id='content'>
            {
                items.length < 1 ? (
                    <>
                        <Alert status='warning'>
                            You have not any items in your basket.
                        </Alert>
                    </>
                ) : (
                    <>
                        <Box>
                            <Heading size='lg'>
                                Total price: {total}
                            </Heading>
                        </Box>
                        <br />
                        <Box>
                            <Button colorScheme='green' onClick={onOpen}>Order</Button>
                        </Box>
                        <br />
                        <ul>
                            <Grid templateColumns='repeat(5, 1fr)' gap={16}>
                                {
                                    items.map((item) => (
                                        <li key={item._id}>
                                            <NavLink to={`/product/${item._id}`}>
                                                {item.title} - {item.price} ₺
                                            </NavLink>
                                            <Image htmlWidth='200' src={item.photos[0]} alt='basket item' />
                                            <Button mt='2' size='sm' colorScheme='pink' onClick={() => removeFromBasket(item._id)}>Remove from basket</Button>
                                        </li>
                                    ))
                                }
                            </Grid>
                        </ul>

                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Order</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Adress</FormLabel>
                                        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                )
            }
        </div>
    )
}

export default Basket 