import { ActiveLink } from "../active-link/ActiveLink";
import { ListUnorderedIcon, PersonIcon, TrophyIcon } from "@primer/octicons-react";

const navbarItems = [
  {path: "/sales", text: "Ventas", icon: <ListUnorderedIcon className="mr-1"/>},
  {path: "/score", text: "Score", icon: <TrophyIcon className="mr-1"/>},
  {path: "/profile", text: "Perfil", icon: <PersonIcon className="mr-1"/>},
];
export const Navbar = () => {
  return (
    <nav className="flex bg-gray-400 px-3 py-6 m-2 mb-10 rounded justify-around">
      {navbarItems.map((item) => {
        return <ActiveLink key={item.path} path={item.path} text={item.text} icon={item.icon}/>
      })}
    </nav>
  );
};
