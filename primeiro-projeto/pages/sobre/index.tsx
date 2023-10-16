import Link from "next/link"
import React from "react"



const Sobre = () => {
    return (
        <div>
            <h1>Página sobre</h1>

            <ul>
                <li><Link href="/sobre/bonieky">Bonieky</Link></li>
                <li><Link href="/sobre/joao">João</Link></li>
            </ul>

            <Link href="/sobre/todo">To dos</Link>
        </div>
    )
}

export default Sobre