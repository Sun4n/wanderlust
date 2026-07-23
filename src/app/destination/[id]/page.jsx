import BookingCard from '@/component/shared/BookingCard';
import { DeleteModal } from '@/component/shared/DeleteModal';
import EditModal from '@/component/shared/EditModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

import Image from 'next/image';
import React from 'react';
import { FaArrowLeft, FaCheck, FaLocationDot, FaStar } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';

const DestinationDetailPage = async ({ params }) => {
    const { id } = await params
    const token = await auth.api.getToken({
        headers:await headers()
    })
    console.log(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,{
        headers:{
             authorization: `Bearer ${token.token}`
        }
    })
    const destination = await res.json()
    // console.log(destinaiton);
    const { destinationName, imageUrl, price, duration, country, departureDate } = destination
    return (
        <div className='max-w-[1280px] mx-auto'>

            <div className='flex justify-between items-center py-3'>
                <div className='flex gap-2 items-center text-gray-400 '>
                    <FaArrowLeft />
                    <h1 className='text-2xl  font-medium'>Back to Destinations</h1>
                </div>
                <div className='flex gap-2'>
                    <EditModal destination={destination}></EditModal>
                    <DeleteModal destination={destination}></DeleteModal>
                </div>
            </div>

            <div>
                <Image src={imageUrl} width={1280} height={572} alt={destinationName} className='object-cover rounded-lg h-[572px] w-full'></Image>
                <div className='flex justify-between'>
                    <div className='space-y-2 pb-6'>
                        <div className='flex items-center gap-1 py-1'>
                            <FaLocationDot />
                            <h1 className='font-medium text-[1rem]'>{country}</h1>
                        </div>
                        <h1 className='font-bold text-2xl'>{destinationName}</h1>
                        <div className='flex gap-2 items-center'>
                            <FaStar />
                            <p className='font-bold'>4.9 <span className='text-gray-400 font-normal'>(234 reviews)</span></p>
                            <div className='flex gap-1 items-center'>
                                <SlCalender />
                                <p>{duration}</p>
                            </div>
                        </div>
                        <h1 className='text-2xl font-medium'>OverView</h1>
                        <p>Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience <br /> luxury resorts, tropical landscapes, and unforgettable sunsets.</p>
                        <h1 className='text-2xl font-medium'>Highlight</h1>
                        <p>Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience <br /> luxury resorts, tropical landscapes, and unforgettable sunsets.</p>
                        <ul className='grid grid-cols-2 gap-2 items-center'>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Luxury beachfront accommodation</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Visit Uluwatu Temple at sunset</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Traditional Balinese spa treatment</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Private beach dinner experience</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Sunrise trek to Mount Batur</li>
                        </ul>
                    </div>
                    <div className='bg-white shadow-xl/30 w-[400px] h-[428px] p-5 mb-6 mt-6 rounded-2xl'>
                        <BookingCard destination={destination}></BookingCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailPage;