import { ActiveLink } from "../active-link/ActiveLink";
import { ListUnorderedIcon, PersonIcon, TrophyIcon } from "@primer/octicons-react";

export const Navbar = () => {
  return (
    <nav className="flex bg-gray-500 bg-opacity-30 p-2 m-2 rounded justify-around">
      <ActiveLink path="/sales" text="Ventas" icon={<ListUnorderedIcon className="mr-1"/>}/>
      <ActiveLink path="/score" text="Score" icon={<TrophyIcon className="mr-1"/>}/>
      <ActiveLink path="/profile" text="Perfil" icon={<PersonIcon className="mr-1"/>}/>
    </nav>
  );
};
