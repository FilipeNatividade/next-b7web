import React from 'react'
import style from './MyButton.module.css'

const MyButton = ({ label, onClick }: { label: string, onClick: any }) => {
    return (
        <button className={style.myBtn} onClick={onClick}>{label}</button>
    )
}

export default MyButton