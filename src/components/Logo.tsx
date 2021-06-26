import { Link } from "react-router-dom";
import logoImg from '../assets/images/logo.svg'

type PathProps = {
  path?: string;
}

export function Logo({ path = "/" }: PathProps) {
  return (
    <Link to={path}><img src={logoImg} alt="Logo do Letmeask" /></Link>
  )
}