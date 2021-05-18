import React, { Fragment } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Container from "./Container";
import ChildrenData from "../types/ChildrenData";

const solutions = [
  {
    name: "Blog",
    description: "Learn about tips, product updates and company culture.",
    href: "#",
  },
  {
    name: "Help Center",
    description: "Get all of your questions answered in our forums of contact support.",
    href: "#",
  },
  {
    name: "Guides",
    description: "Learn how to maximize our platform to get the most out of it.",
    href: "#",
  },
  {
    name: "Events",
    description: "Check out webinars with experts and learn about our annual conference.",
    href: "#",
  },
  { name: "Security", description: "Understand how we take your privacy seriously.", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Layout({ children }) {
  return (
    <>
      <nav>
        <Container layout="sm">
          <div className="pt-5">
            <div className="flex justify-between border-b pb-3">
              <Link to="/">
                <h1 className="text-3xl font-bold tracking-tight leading-tight text-gray-700 hover:text-gray-800 transition ease-in-out duration-150">
                  <StaticQuery
                    query={graphql`
                      {
                        settingYaml {
                          navigationTitle
                        }
                      }
                    `}
                    render={(data) => data.settingYaml.navigationTitle}
                  />
                </h1>
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Todo</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel
                        static
                        className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {solutions.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                              >
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </a>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </Container>
      </nav>
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: ChildrenData.isRequired,
};

export default Layout;
