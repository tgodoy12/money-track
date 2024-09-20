import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import "../../styles/navbar.css"
import icon from "../../img/icon.png"


export const Navbar = () => {

  const navigation = [
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" style={{ width: '80px', height: '60px' }}>
              <span className="sr-only">Money-Tracker</span>
              <img
                alt="Money-Tracker Logo"
                src={icon}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="navigation-list hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-medium leading-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/login"
              className="login text-sm font-semibold leading-6 text-gray-900 transition ease-in-out delay-150 hover:-translate-x-3 hover:scale-110 duration-300"
              style={{ display: "inline-block", width: "auto", whiteSpace: "nowrap" }}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed dialog-panel inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Money-Tracker</span>
                <img
                  alt="Money-Tracker Logo"
                  src={icon}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 navigation-list-mobile block rounded-lg px-3 py-2 text-base font-semibold"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 navigation-list-mobile block rounded-lg px-3 py-2.5 text-base font-semibold"
                  >
                    Log in
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 navigation-list-mobile block rounded-lg px-3 py-2.5 text-base font-semibold"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
     </div>
  )
}


