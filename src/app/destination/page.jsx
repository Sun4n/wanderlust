import DestinationCard from '@/component/shared/DestinationCard';
import React from 'react';

const DestinationPage = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`)
    const destinations = await res.json()

    return (
        <div className='grid grid-cols-3 gap-6 max-w-[1280px] mx-auto py-3'>
            {
                destinations.map(destination=><DestinationCard key={destination._id} destination={destination}></DestinationCard>)
            }
        </div>
    );
};

export default DestinationPage;