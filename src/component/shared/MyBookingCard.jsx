'use client'
import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const MyBookingCard = ({ booking }) => {
    const { userName, imageUrl, destinationName, price, departureDate ,_id} = booking
    // console.log(userName);
    const handleDelete=async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${_id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        })
        const data = await res.json()
        redirect('/')
        console.log(data);
        
    }
    return (
        <Card className='w-[1280px]  rounded-none border border-2'>
            <div className='flex gap-6'>
                <div>
                    <Image src={imageUrl} alt={destinationName} width={400} height={200} className='h-[225px] object-cover w-[400px]'></Image>
                </div>
                <div className='w-full space-y-5'>
                    <h1 className='text-[40px] font-semibold '>
                        {destinationName}
                    </h1>
                    <p className='text-[1rem] font-medium text-gray-400'>Departure:{new Date(departureDate).toDateString()}</p>
                    <p className='text-[1rem] font-medium text-gray-400'>Bookin Id:{_id}</p>
                    <div className='flex justify-between items-center'>
                        <p className='text-[40px] text-cyan-500'>${price}</p>
                        <div className='flex gap-2'>
                            <Button onClick={handleDelete} variant='danger' className="bg-none rounded-none">Cancle</Button>
                            <Button  variant='primary' className="bg-none rounded-none">View</Button>
                        </div>
                    </div>

                </div>
            </div>
        </Card>
    );
};

export default MyBookingCard;