import logo from "./logo-placeholder-image.png";
import "./SearchBar.scss";
import { IoAppsSharp } from "react-icons/io5";
export function SearchBar() {
  return (
    <div className="SearchBar">
      <div className="Logo">
        <img src={logo} alt="logo" height="80"></img>
      </div>
      <div className="InputSearch">
        <input type="text" placeholder="Search Video"></input>
      </div>
      <div className="Actions">
        <IoAppsSharp size={30}></IoAppsSharp>
      </div>
    </div>
  );
}
