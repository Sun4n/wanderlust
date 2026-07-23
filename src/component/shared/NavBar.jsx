"use client"
import React from 'react';
import { Link, Button, Avatar } from "@heroui/react";
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const NavBar = () => {
    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user
    // console.log(user);
    const handleLogOut =async()=>{
        await authClient.signOut();
    }
    return (
        <nav className=" z-40 w-[100%]  ">
            <header className="flex h-16 items-center justify-between px-6">
                <ul className="flex items-center gap-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/destination">Destinations</Link></li>
                    <li><Link href="/my-booking">My Bookings</Link></li>
                    <li><Link href="#">Admin</Link></li>
                    <li><Link href="/add-destination">Add destination</Link></li>
                </ul>
                <div className="flex items-center gap-3">

                    <Image src={"/assets/Wanderlast.png"} width={160} height={24} alt='wanderlast logo'></Image>
                </div>

                <ul className="flex items-center gap-4">
                    <li><Link href="/profile">Profile</Link></li>
                    {
                        user ? <div className='flex items-center gap-2'>
                            <Avatar>
                                <Avatar.Image alt="John Doe" src={user?.image} />
                                <Avatar.Fallback>{user?.name}</Avatar.Fallback>
                            </Avatar>
                            <Button onClick={handleLogOut} className="rounded-none">LogOut</Button>
                        </div> : <><li><Link href="/login">Sing In</Link></li>
                            <li><Link href="/singup">Sing Up</Link></li></>
                    }
                </ul>
            </header>
        </nav>
    );
};

export default NavBar;