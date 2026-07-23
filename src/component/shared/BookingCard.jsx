'use client'
import React, { useState } from 'react';
import { Button, DateField, Label } from '@heroui/react';
import { FaCheck } from 'react-icons/fa6';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
const BookingCard = ({ destination }) => {
    const { _id, destinationName, imageUrl, price, duration, country, departureDate } = destination
    const [departure, setDeparture] = useState(null)
    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user
    // console.log(user);
    // console.log(new Date(departure));
    const handleBooking = async() => {
        const booking = {
            userName: user?.name,
            userId: user?.id,
            userImage: user?.image,
            destinationId: _id,
            price,
            destinationName,
            imageUrl,
            country,
            departureDate
        }
        // console.log(booking);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)

        })
        const data = await res.json()
        toast.success("Your booked succesfully")

    }
    return (
        <div>
            <div className='space-y-1'>
                <p className='text-[1rem] text-gray-400 '>Starting</p>
                <p className='text-[30px] text-cyan-500 font-bold'>${price}</p>
                <p className='text-[1rem] text-gray-400'>per person</p>
            </div>
            <div className='bg-gray-200 p-4 w-[360px] pt-2 mt-5'>
                <DateField onChange={setDeparture} className=" bg-none rounded-none w-[256px]" name="date">
                    <Label>Departure Date</Label>
                    <DateField.Group>
                        <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>
                    </DateField.Group>
                </DateField>
            </div>
            <p className='border-b-1 border-gray-300 pt-5'></p>
            <button onClick={handleBooking} className='bg-cyan-500 mt-5 pl-[127px] pr-[155px] py-4 text-white'>Buy Now</button>
            <ul className='space-y-2 mt-2'>
                <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Luxury beachfront accommodation</li>
                <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Visit Uluwatu Temple at sunset</li>
                <li className='flex items-center gap-2'><FaCheck className='text-green-500' />Traditional Balinese spa treatment</li>

            </ul>
        </div>
    );
};

export default BookingCard;