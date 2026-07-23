import MyBookingCard from '@/component/shared/MyBookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    // console.log(user);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}`)
    const bookingsData = await res.json()
    // console.log(bookingsData);
    return (
        <div className='max-w-[1280px] mx-auto'>
            My booking
            {
                bookingsData.map(booking=><MyBookingCard key={booking._id} booking={booking}></MyBookingCard>)
            }
        </div>
    );
};

export default MyBookingPage;