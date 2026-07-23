import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FiArrowUpRight } from 'react-icons/fi';
import { SlCalender } from 'react-icons/sl';

const DestinationCard = ({ destination }) => {
    const { _id,destinationName, imageUrl, price, duration, country } = destination
    console.log(destinationName);
    return (
        <div className='w-[417px] h-[375px]'>
            <div>
                <Image src={imageUrl} width={410} height={231} alt='destinationName' className='w-full h-[231px] object-cover rounded-lg'></Image>
                <div className='flex items-center gap-1 py-1'>
                    <FaLocationDot />
                    <h1 className='font-medium text-[1rem]'>{country}</h1>
                </div>
                <div className='flex justify-between gap-1 py-1'>
                    <h1 className='font-bold text-2xl'>{destinationName}</h1>
                    <p className='font-bold'>{price}<span className='font-normal'>/person</span></p>
                </div>
                <div className='flex gap-1 items-center'>
                    <SlCalender />
                    <p>{duration}</p>
                </div>
                <Link href={`/destination/${_id}`}><p className='text-cyan-500 font-semibold text-lg flex items-center'>Book Now <FiArrowUpRight /></p></Link>
            </div>
        </div>
    );
};

export default DestinationCard;