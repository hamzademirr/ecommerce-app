import React, { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Flex, Spinner, Heading, Button } from "@chakra-ui/react";
import { fetchProductList, deleteProducts } from '../../../api';
import { Popconfirm, Table } from 'antd';
import { NavLink } from "react-router-dom";

function Products() {
  const querClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductList);
  const deleteMutation = useMutation(deleteProducts, {
    onSuccess: () => querClient.invalidateQueries('admin:products')
  })


  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <>
            <NavLink to={`/admin/products/${record._id}`}>
              <Button colorScheme='purple' size='xs'>Edit</Button>
            </NavLink>
            <Popconfirm
              title='Are you Sure?'
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log('succsess')
                  }
                })
              }}
              onCancel={() => console.log('Canceling')}
              okText='Yes'
              cancelText='No'
              placement='left'
            >
              <Button style={{ marginLeft: 10 }} colorScheme='purple' size='xs'>Delete</Button>
            </Popconfirm>
          </>
        )
      }
    ]
  }, [])


  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" size='xl' color="purple.200" />
      </Flex>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (
    <div id='content'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading as='h3'>
          Products
        </Heading>
        <NavLink to='/admin/new-products'>
          <Button colorScheme='purple'>New Product</Button>
        </NavLink>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey='_id' />
    </div>
  )
}

export default Products