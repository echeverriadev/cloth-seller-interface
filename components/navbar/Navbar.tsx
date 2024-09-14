import { ListUnorderedIcon, PersonIcon, TrophyIcon } from "@primer/octicons-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex bg-gray-500 bg-opacity-30 p-2 m-2 rounded justify-around">
      <Link href="sales" className="flex items-center" >
        <ListUnorderedIcon size={16} className="mr-1" />
        Ventas
      </Link>
      <Link href="score" className="flex items-center" >
        <TrophyIcon size={16} className="mr-1" />
        Scoreboard</Link>
      <Link href="profile" className="flex items-center">
        <PersonIcon size={16} className="mr-1" />
        Profile
      </Link>
    </nav>
  );
};
