import React, { useEffect } from "react";
import useState from "react-usestateref";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Notifications from "./Notifications";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useFileUpload } from "use-file-upload";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Profile", href: "/profile", current: false },
  { name: "Settings", href: "/settings", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SellerTopHeader({
  openDashboard,
  openOrders,
  openDesigns,
  openChat,
  openProfile,
  openSettings,
}) {
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/dashboard", current: true },
    { name: "Designs", href: "/designs", current: false },
    { name: "Orders", href: "/orders", current: false },
    { name: "Chat", href: "/chat", current: false },
  ]);
  const nav = useNavigate();
  const [NotifyState, setNotifyState] = useState(false);
  const [profilepicture, setProfilePicture] = useState();
  const NotifyScreen = () => {
    return <Notifications showModal={setNotifyState} />;
  };
  const signOut = () => {
    localStorage.clear();
    nav("/signin");
  };
  const doNothing = () => {
    return;
  };
  //create a function to get the profile picture
  const getProfilePicture = async () => {
    await axios
      .get("http://backend-fashionhub.herokuapp.com/designer/getprofilepic", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        //set the profile picture
        setProfilePicture(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    await getProfilePicture();
  }, []);

  return (
    <>
      {NotifyState && NotifyScreen()}
      <div className="sticky top-0 z-10">
        <Disclosure as="nav" className="bg-gray-800 ">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => {
                              {
                                item.name === "Dashboard"
                                  ? openDashboard(true)
                                  : openDashboard(false);
                                item.name === "Orders"
                                  ? openOrders(true)
                                  : openOrders(false);
                                item.name === "Designs"
                                  ? openDesigns(true)
                                  : openDesigns(false);
                                item.name === "Chat"
                                  ? openChat(true)
                                  : openChat(false);
                                item.name === "Profile"
                                  ? openProfile(true)
                                  : openProfile(false);
                                item.name === "Settings"
                                  ? openSettings(true)
                                  : openSettings(false);
                              }
                              {
                                item.name === "Dashboard"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Dashboard"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openDashboard(false);
                                item.name === "Orders"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Orders"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openOrders(false);
                                item.name === "Designs"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Designs"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openDesigns(false);
                                item.name === "Chat"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Chat"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openChat(false);
                                item.name === "Profile"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Profile"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openProfile(false);
                                item.name === "Settings"
                                  ? setNavigation((prev) =>
                                      prev.map((nav) =>
                                        nav.name === "Settings"
                                          ? { ...nav, current: true }
                                          : { ...nav, current: false }
                                      )
                                    )
                                  : openSettings(false);
                              }
                            }}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        id="notify"
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        onClick={() => setNotifyState(true)}
                      >
                        <span className="sr-only  ">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        id="Logout"
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        onClick={() => signOut()}
                      >
                        <span className="sr-only  ">Log out</span>
                        <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                profilepicture
                                  ? profilepicture
                                  : "https://st2.depositphotos.com/47577860/45635/v/950/depositphotos_456355278-stock-illustration-users-dots-profile-account-loading.jpg?forcejpeg=true"
                              }
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                    onClick={() => {
                                      item.name === "Profile"
                                        ? openProfile(true)
                                        : openProfile(false);
                                      item.name === "Dashboard"
                                        ? openDashboard(true)
                                        : openDashboard(false);
                                      item.name === "Orders"
                                        ? openOrders(true)
                                        : openOrders(false);
                                      item.name === "Designs"
                                        ? openDesigns(true)
                                        : openDesigns(false);
                                      item.name === "Chat"
                                        ? openChat(true)
                                        : openChat(false);
                                      item.name === "Settings"
                                        ? openSettings(true)
                                        : openSettings(false);
                                      item.name === "Sign Out"
                                        ? signOut()
                                        : doNothing();
                                    }}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={() => {
                          item.name === "Sign Out" ? signOut() : doNothing();
                        }}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

export default SellerTopHeader;
