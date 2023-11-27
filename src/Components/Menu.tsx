import { Menu as DropdownMenu, Transition } from '@headlessui/react'
import {Bars3Icon, ShoppingCartIcon, HomeIcon} from "@heroicons/react/24/solid";
import {IoMdFlower, IoMdSnow, IoMdSunny, IoMdLeaf} from "react-icons/io";
import React, { Fragment } from 'react'
import {Link} from "react-router-dom";

interface MenuItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
}

interface ChangeSeasonItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
}

interface MenuProps {
    setSeason: (newSeason: string) => void;
}

const menuItems: MenuItem[] = [
    { name: "Home | All Meals", href: "/", icon: HomeIcon },
    { name: "Shopping List", href: "/shopping-list", icon: ShoppingCartIcon },
];

const changeSeason: ChangeSeasonItem[] = [
    { name: "winter", href: "/", icon: IoMdSnow },
    { name: "spring", href: "/", icon: IoMdFlower },
    { name: "summer", href: "/", icon: IoMdSunny },
    { name: "autumn", href: "/", icon: IoMdLeaf },
];
export default function Menu({setSeason}: MenuProps) {

    const onSeasonChange = (newSeason: string) => {
        setSeason(newSeason)
    }

    return (
        <DropdownMenu>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 z-50">
                <DropdownMenu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6">
                    <Bars3Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </DropdownMenu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200 transform"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in duration-150 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
            >
                <DropdownMenu.Items className="absolute flex mt-2 w-screen bg-gray-900 py-2 px-6 shadow-lg ring-1 z-50 ring-gray-900/5 h-screen">
                    <div className="flex flex-col mx-auto gap-y-6">
                        {menuItems.map((item) => (
                            <DropdownMenu.Item key={item.name}>
                                <Link
                                    to={item.href}
                                    className="flex gap-x-4 py-2 text-l font-semibold leading-6 text-gray-100"
                                >
                                    <item.icon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            </DropdownMenu.Item>
                        ))}
                        <div>
                            <h3 className="text-l font-medium leading-6 text-gray-100 mt-2">Change Season:</h3>
                            <div className="mt-6 flow-root">
                                <div className="-my-2">
                                    {changeSeason.map((item) => (
                                        <DropdownMenu.Item key={item.name} >
                                        <Link
                                            to={item.href}
                                            onClick={() => onSeasonChange(item.name)}
                                            className="flex gap-x-4 py-2 text-l font-semibold leading-6 text-gray-100"
                                        >
                                            <item.icon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                        </DropdownMenu.Item>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenu.Items>
            </Transition>
        </DropdownMenu>
    )
}