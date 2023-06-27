import { Popover, Transition } from '@headlessui/react'
import {Bars3Icon, ShoppingCartIcon, HomeIcon} from "@heroicons/react/24/solid";
import {IoMdFlower, IoMdSnow, IoMdSunny, IoMdLeaf} from "react-icons/io";
import React, { Fragment, useState } from 'react'
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

const changeSeason = [
    { name: "winter", href: "#", icon: IoMdSnow },
    { name: "spring", href: "#", icon: IoMdFlower },
    { name: "summer", href: "#", icon: IoMdSunny },
    { name: "autumn", href: "#", icon: IoMdLeaf },
];
export default function Menu({setSeason}: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const onSeasonChange = (newSeason: string) => {
        setSeason(newSeason)
        setIsOpen(false)
    }

    return (
        <Popover className="relative isolate z-50 shadow">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6">
                    <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6">
                        <Bars3Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </Popover.Button>
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
                <Popover.Panel className="absolute left-0 mt-2 w-screen bg-gray-900 py-2 px-4 shadow-lg ring-1 ring-gray-900/5 h-screen">
                        <div className="grid grid-cols-1 gap-y-6">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-100"
                                            >
                                                <item.icon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                                                {item.name}
                                            </Link>
                                        ))}
                            <div>
                                <h3 className="text-sm font-medium leading-6 text-gray-100">ChangeSeason</h3>
                                <div className="mt-6 flow-root">
                                    <div className="-my-2">
                                        {changeSeason.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => onSeasonChange(item.name)}
                                                className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-100"
                                            >
                                                <item.icon className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}