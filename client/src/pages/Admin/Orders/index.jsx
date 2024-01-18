import React from 'react'
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
import {
  Flex,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from '@chakra-ui/react'

function Orders() {
  const { isLoading, isError, data, error } = useQuery('admin:orders', fetchOrders);

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" size='xl' color="purple.200" />
      </Flex>
    )
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div id='content'>
      <Heading as='h2' p='4'>Orders</Heading>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Adress</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </div>
  )
}

export default Orders