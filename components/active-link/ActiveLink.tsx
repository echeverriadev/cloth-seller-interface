"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./ActiveLink.module.css";

interface ActiveLinkProps {
  path: string;
  text: string;
  icon?: React.ReactNode;
}
export const ActiveLink = ({ path, text, icon }: ActiveLinkProps) => {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`${style.link} ${pathName === path && style["active-link"]} flex items-center`}
    >
      {icon}
      {text}
    </Link>
  );
};
