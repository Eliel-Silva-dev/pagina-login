import Link from 'next/link';
import style from './style.min.module.css';
import { FaUserCircle } from "react-icons/fa";

const Logo = () => {
  return (
    <div id={style.logo_title}>
      <FaUserCircle />
      <h2>
        <Link href={'/'}>Login</Link>
      </h2>
    </div>
  );
};

export default Logo;
