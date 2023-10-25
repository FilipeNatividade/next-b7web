import React, { useState } from "react"
import MyButton from "@/components/MyButton"
import Link from "next/link"
import Script from "next/script"
import style from '../../styles/Sobre.module.css'

const Sobre = () => {
    const [contador, setContador] = useState(0)

    const handleContadorBtn = () => {
        setContador(contador + 1)
    }

    return (
        <div>
            <h1 className={style.sobreTitle}>Página sobre</h1>

            <ul>
                <li><Link href="/sobre/bonieky">Bonieky</Link></li>
                <li><Link href="/sobre/joao">João</Link></li>
            </ul>

            <Link href="/sobre/todo">To dos</Link>

            <Script
                src="https://google-analytics.com/analytics.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // rodar alguma função depopis que carregar o script
                }}
            />

            {/* opção para rodar não um arquivo especifico, mas carregar um código, uma lista de codigos, linhas de codigos*/}
            {/* <Script
                strategy="afterInteractive"
            >
                {`window.alert('carreguei')`}
            </Script> */}
            <div>
                {/* <button onClick={handleContadorBtn} className="btn btn-primary">Aumentar</button> */}
                <MyButton onClick={handleContadorBtn} label='Aumentar' />
                <p>Contador: {contador}</p>
            </div>

            {/* <style global jsx>
                {`
                    li{
                      background-color:#dedede  
                    }

                    body{
                        background-color:black;
                        color:#fff
                    }
                `}
            </style> */}
        </div>
    )
}

export default Sobre