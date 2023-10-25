import React, { ReactElement } from 'react'
import style from './Layout.module.css'
import { NavBar } from '../NavBar'
import { useRouter } from 'next/router'

type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {
    const router = useRouter()
    const { pathname } = router

    if (pathname === '/exemplo') {
        return (
            <div>{children}</div>
        )
    } else {
        return (
            <div className={style.container}>
                <header className={style.header}>
                    <h1>Meu próprio projeto</h1>
                </header>
                <NavBar />
                <main className={style.main}>
                    {children}
                </main>
                <footer className={style.footer}>
                    Todos os direitos reservados.
                </footer>
            </div>
        )
    }
}
