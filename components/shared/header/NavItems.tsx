"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx"
import { NavItemsProps, HeaderLink } from "./model";

export default function NavItems({ items }: NavItemsProps) {
  const pathname = usePathname()
  return (
    <ul>
      {
        items.map((item: HeaderLink) => {
          const isActive = pathname === item.route

          return (
            <li key={item.label}>
              <Link
                href={item.route}
                className={clsx(['hover:opacity-70', {'text-purple-500': isActive}])}
              >{item.label}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}