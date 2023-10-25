import React from 'react'
import Link from 'next/link'
import { navigationLinks } from '../../utils/data'
import { useRouter } from 'next/router'
import style from './NavBar.module.css'

export const NavBar = () => {
  const _router = useRouter()
  const { pathname } = _router



  return (
    <ul className={style.container}>
      {navigationLinks.map((item) => (
        <li
          key={item.label}
          className={item.path.includes(pathname) ? style.linkActive : style.linkItem}
        >
          <Link href={item.path[0]}>{item.label}</Link>
        </li>
      ))}
    </ul>
  )
}

